import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import {
  createUser,
  createReservation,
  disconnectPrisma,
  createUserFavorite,
} from "./seed/user.mjs";
import { userGuest, userStephanie } from "./seed/data.mjs";

async function main() {
  // clear all data before seeding
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.reservation.deleteMany();

  await createUser(userStephanie);
  await createUser(userGuest);
  await createUserFavorite(userGuest.email);
  await createReservation(userGuest.email);

  console.log("Seed data created successfully");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await disconnectPrisma();
  });
