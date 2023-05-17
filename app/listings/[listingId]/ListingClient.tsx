"use client";

import { useMemo, useState } from "react";
import { Range } from "react-date-range";

import { SafeListing, SafeReservation, SafeUser } from "@/libs/types";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import { User } from "@prisma/client";
import {
  useCalculateTotalPrice,
  useCreateReservation,
  useDisabledDates,
} from "@/libs/axios";
import { getCategory } from "@/libs/actions/getCategory";

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
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useDisabledDates(reservations);
  const createReservation = useCreateReservation();
  const totalPrice = useCalculateTotalPrice(dateRange, listing.price);
  const category = useMemo(() => getCategory(listing), [listing]);

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
