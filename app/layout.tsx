import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar/Navbar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";

import ToasterProvider from "@/libs/providers/ToastProvider";

import "./globals.css";
import getCurrentUser from "../libs/actions/getCurrentUser";
import SearchModal from "@/components/modals/SearchModal";
import { Suspense } from "react";
import Provider from "./Provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
          <Suspense fallback={<div>Loading...</div>}>
            <SearchModal />
            <Navbar currentUser={currentUser} />
          </Suspense>
          <div className="pb-20 pt-28">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
