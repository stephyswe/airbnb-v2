"use client";

import { User } from "@prisma/client";
import { useDeletion } from "../../libs/axios";
import ListingCard from "./ListingCard";
import { SafeListing, SafeReservation } from "../../libs/types";

interface CustomProps {
  data: SafeListing[] | SafeReservation[];
  currentUser: User | null;
  route: string;
  toastMessage: string;
}

const ListingCardContainerAction: React.FC<CustomProps> = ({
  data,
  currentUser,
  route,
  toastMessage,
}) => {
  const { onAction, deletingId } = useDeletion(route, toastMessage);

  return (
    <>
      {data.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onAction}
          disabled={deletingId === listing.id}
          actionLabel="Delete property"
          currentUser={currentUser}
        />
      ))}
    </>
  );
};

export default ListingCardContainerAction;
