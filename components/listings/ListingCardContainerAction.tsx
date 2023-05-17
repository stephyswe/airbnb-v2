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
    <div
      className="
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
    "
    >
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
    </div>
  );
};

export default ListingCardContainerAction;
