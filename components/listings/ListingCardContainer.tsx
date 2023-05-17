"use client";

import { User } from "@prisma/client";
import ListingCard from "./ListingCard";
import { SafeListing } from "../../libs/types";

interface CustomProps {
  listings: SafeListing[];
  currentUser: User | null;
}

const ListingCardContainer: React.FC<CustomProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <>
      {listings.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
          currentUser={currentUser}
        />
      ))}
    </>
  );
};

export default ListingCardContainer;
