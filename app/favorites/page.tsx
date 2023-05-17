import EmptyState from "@/components/EmptyState";

import getFavoriteListings from "@/libs/actions/getFavoriteListings";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import getCurrentUser from "@/libs/actions/getCurrentUser";

import ListingCardContainer from "../../components/listings/ListingCardContainer";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <ListingCardContainer listings={listings} currentUser={currentUser} />
    </Container>
  );
};

export default ListingPage;
