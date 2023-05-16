import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(user) {
  await prisma.user.upsert({
    where: { email: user.email },
    update: {},
    create: user,
  });

  console.log("User created: ", user.name);
}

export async function createUserFavorite(email) {
  const listingId = (await prisma.listing.findMany())?.[0]?.id ?? null;

  await prisma.user.upsert({
    where: { email: email },
    update: {
      favoriteIds: [listingId],
    },
    create: {},
  });

  console.log(`Favorite created by ${email} at ${listingId}`);
}

export async function createReservation(email) {
  const listingId = (await prisma.listing.findMany())?.[0]?.id ?? null;
  const guest = await prisma.user.findUnique({
    where: { email },
  });

  const reservationData = {
    userId: guest.id,
    listingId: listingId,
    startDate: new Date("2023-05-21T22:00:00.000Z"),
    endDate: new Date("2023-05-25T22:00:00.000Z"),
    totalPrice: 800,
    createdAt: new Date("2023-05-16T07:25:38.459Z"),
  };

  await prisma.reservation.upsert({
    where: { id: "64632ff2150204d03b87e0f6" },
    update: reservationData,
    create: reservationData,
  });

  console.log(`Reservation created by ${email} at ${listingId}`);
}

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
