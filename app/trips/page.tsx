import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/libs/actions/getCurrentUser";
import getReservations from "@/libs/actions/getReservations";

import Heading from "../../components/Heading";
import Container from "../../components/Container";
import ListingCardContainerAction from "../../components/listings/ListingCardContainerAction";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  console.log("reservations", reservations);

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
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
        <ListingCardContainerAction
          data={reservations}
          currentUser={currentUser}
          route="reservations"
          toastMessage="Reservation canceled"
          actionLabel="Cancel reservation"
        />
      </div>
    </Container>
  );
};

export default TripsPage;
