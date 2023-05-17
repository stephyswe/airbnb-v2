"use client";

import { User } from "@prisma/client";

import ContainerCard from "@/components/ContainerCard";
import ListingCard from "@/components/listings/ListingCard";

import { useDeletion } from "@/libs/axios";
import { SafeListing, SafeReservation } from "@/libs/types";

interface CustomProps {
  data: SafeListing[] | SafeReservation[];
  currentUser: User | null;
  route: string;
  toastMessage: string;
  actionLabel: string;
}

const ListingCardContainerAction: React.FC<CustomProps> = ({
  data,
  currentUser,
  route,
  toastMessage,
  actionLabel,
}) => {
  const { onAction, deletingId } = useDeletion(route, toastMessage);

  return (
    <ContainerCard>
      {data.map((item: any) => (
        <ListingCard
          key={item.id}
          data={item.listing || item}
          reservation={item.listing ? item : undefined}
          actionId={item.id}
          onAction={onAction}
          disabled={deletingId === item.id}
          actionLabel={actionLabel}
          currentUser={currentUser}
        />
      ))}
    </ContainerCard>
  );
};

export default ListingCardContainerAction;
