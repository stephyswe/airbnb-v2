import { Listing, Reservation, User } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
      hashedPassword: string | null;
      createdAt: Date;
      updatedAt: Date;
      favoriteIds: string[];
    } & DefaultSession["user"];
  }
}
