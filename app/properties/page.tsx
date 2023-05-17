import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/libs/actions/getCurrentUser";
import Heading from "@/components/Heading";

import Container from "@/components/Container";
import ListingCardContainerAction from "@/components/listings/ListingCardContainerAction";

import getListings from "@/libs/actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
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
          data={listings}
          currentUser={currentUser}
          route="listings"
          toastMessage="Listing deleted"
        />
      </div>
    </Container>
  );
};

export default PropertiesPage;
