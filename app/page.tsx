export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import ListingCardContainer from "@/components/listings/ListingCardContainer";
import EmptyState from "@/components/EmptyState";

import getListings, { IListingsParams } from "@/libs/actions/getListings";
import getCurrentUser from "@/libs/actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  // throw new Error("Something went wrong");

  return (
    <Container>
      <ListingCardContainer
        root
        currentUser={currentUser}
        listings={listings}
      />
    </Container>
  );
};

export default Home;
