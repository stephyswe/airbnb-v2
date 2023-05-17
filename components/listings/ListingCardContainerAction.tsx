"use client";

import { User } from "@prisma/client";
import { useListingDeletion } from "../../libs/axios";
import ListingCard from "./ListingCard";
import { SafeListing } from "../../libs/types";

interface CustomProps {
  listings: SafeListing[];
  currentUser: User | null;
}

const ListingCardContainerAction: React.FC<CustomProps> = ({
  listings,
  currentUser,
}) => {
  const { deleteListing, deletingId } = useListingDeletion();

  return (
    <>
      {listings.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={deleteListing}
          disabled={deletingId === listing.id}
          actionLabel="Delete property"
          currentUser={currentUser}
        />
      ))}
    </>
  );
};

export default ListingCardContainerAction;
