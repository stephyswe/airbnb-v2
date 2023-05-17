"use client";

import { User } from "@prisma/client";

import ContainerCard from "@/components/ContainerCard";
import ListingCard from "@/components/listings/ListingCard";

import { SafeListing } from "@/libs/types";

interface CustomProps {
  listings: SafeListing[];
  currentUser: User | null;
  root?: boolean;
}

const ListingCardContainer: React.FC<CustomProps> = ({
  listings,
  currentUser,
  root = false,
}) => {
  return (
    <ContainerCard root={root}>
      {listings.map((listing: any) => (
        <ListingCard
          key={listing.id}
          data={listing}
          currentUser={currentUser}
        />
      ))}
    </ContainerCard>
  );
};

export default ListingCardContainer;
