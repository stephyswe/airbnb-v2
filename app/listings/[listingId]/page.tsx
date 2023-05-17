import ListingClient from "@/app/listings/[listingId]/ListingClient";

import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingHead from "@/components/listings/ListingHead";

import getCurrentUser from "@/libs/actions/getCurrentUser";
import getListingById from "@/libs/actions/getListingById";
import getReservations from "@/libs/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <Container>
      <div
        className="
        max-w-screen-lg
        mx-auto
      "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-7
              md:gap-10
              mt-6
            "
          >
            <ListingClient
              listing={listing}
              reservations={reservations}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingPage;
