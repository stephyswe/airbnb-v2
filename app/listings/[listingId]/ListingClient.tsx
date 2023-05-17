"use client";

import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import { SafeListing, SafeReservation, SafeUser } from "@/libs/types";
import { categories } from "@/components/navbar/Categories";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import { User } from "@prisma/client";
import {
  useCalculateTotalPrice,
  useCreateReservation,
} from "../../../libs/axios";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const createReservation = useCreateReservation();

  const totalPrice = useCalculateTotalPrice(dateRange, listing.price);

  const onCreateReservation = () => {
    createReservation(
      totalPrice,
      dateRange.startDate,
      dateRange.endDate,
      listing?.id,
      currentUser,
      setIsLoading,
      setDateRange
    );
  };

  return (
    <>
      <ListingInfo
        user={listing.user}
        category={category}
        description={listing.description}
        roomCount={listing.roomCount}
        guestCount={listing.guestCount}
        bathroomCount={listing.bathroomCount}
        locationValue={listing.locationValue}
      />
      <div
        className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
      >
        <ListingReservation
          price={listing.price}
          totalPrice={totalPrice}
          onChangeDate={(value) => setDateRange(value)}
          dateRange={dateRange}
          onSubmit={onCreateReservation}
          disabled={isLoading}
          disabledDates={disabledDates}
        />
      </div>
    </>
  );
};

export default ListingClient;
