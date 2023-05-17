import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCardContainerAction from "@/components/listings/ListingCardContainerAction";

import getCurrentUser from "@/libs/actions/getCurrentUser";
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

      <ListingCardContainerAction
        data={listings}
        currentUser={currentUser}
        route="listings"
        toastMessage="Listing deleted"
        actionLabel="Delete property"
      />
    </Container>
  );
};

export default PropertiesPage;
