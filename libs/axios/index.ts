import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useListingDeletion = () => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const deleteListing = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing deleted");
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
    deleteListing,
    deletingId,
  };
};
