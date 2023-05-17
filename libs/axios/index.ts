import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

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
