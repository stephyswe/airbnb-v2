import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import useLoginModal from "@/libs/hooks/useLoginModal";
import { User } from "@prisma/client";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { SafeReservation } from "@/libs/types";

export const useDeletion = (route: string, toastMsg: string) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onAction = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/${route}/${id}`)
      .then(() => {
        toast.success(toastMsg);
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  };

  return {
    onAction,
    deletingId,
  };
};

export const useCreateReservation = () => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const createReservation = useCallback(
    async (
      totalPrice: number,
      startDate: Date | undefined,
      endDate: Date | undefined,
      listingId: string,
      currentUser: User | null | undefined,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      setDateRange: React.Dispatch<React.SetStateAction<Range>>
    ) => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      try {
        await axios.post("/api/reservations", {
          totalPrice,
          startDate,
          endDate,
          listingId,
        });

        toast.success("Listing reserved!");
        setDateRange((prevRange) => ({
          ...prevRange,
          startDate: startDate,
          endDate: endDate,
        }));
        router.push("/trips");
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [loginModal, router]
  );

  return createReservation;
};

export const useCalculateTotalPrice = (
  dateRange: Range,
  listingPrice: number
): number => {
  const [totalPrice, setTotalPrice] = useState(listingPrice);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listingPrice) {
        setTotalPrice((dayCount + 1) * listingPrice);
      } else {
        setTotalPrice(listingPrice);
      }
    }
  }, [dateRange, listingPrice]);

  return totalPrice;
};

export const useDisabledDates = (reservations: SafeReservation[]): Date[] => {
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

  return disabledDates;
};
