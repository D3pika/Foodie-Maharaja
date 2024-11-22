import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import Header from "./_components/Header";
import Provider from "./Provider";
import '@smastrom/react-rating/style.css'
import DefaultLandingPage from './default-landing-page';

export const metadata = {
  title: "Foodie Maharaja",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='px-10 md:px-20 relative'>
          <Provider>
            <SignedIn>
              {/* <Header /> */}
              {children}
            </SignedIn>
            <SignedOut>
              <DefaultLandingPage />
            </SignedOut>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}