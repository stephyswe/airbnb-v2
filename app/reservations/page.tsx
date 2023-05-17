import EmptyState from "@/components/EmptyState";
import Container from "@/components/Container";
import Heading from "@/components/Heading";

import getCurrentUser from "@/libs/actions/getCurrentUser";
import getReservations from "@/libs/actions/getReservations";

import ListingCardContainerAction from "@/components/listings/ListingCardContainerAction";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <ListingCardContainerAction
        data={reservations}
        currentUser={currentUser}
        route="reservations"
        toastMessage="Reservation canceled"
        actionLabel="Cancel guest reservation"
      />
    </Container>
  );
};

export default ReservationsPage;
