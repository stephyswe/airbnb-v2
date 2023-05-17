export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import EmptyState from "@/components/EmptyState";

import getListings, { IListingsParams } from "@/libs/actions/getListings";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  // throw new Error("Something went wrong");

  return (
    <Container>
      <div
        className="
            pt-24
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
        {listings.map((listing: any) => (
          <ListingCard key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default Home;
