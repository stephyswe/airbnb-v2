import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import useLoginModal from "../hooks/useLoginModal";
import { User } from "@prisma/client";
import { Range } from "react-date-range";

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
