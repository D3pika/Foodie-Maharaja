"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Pizza, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CartUpdateContext } from "../_context/CartUpdateContext";
import GlobalApi from "../_utils/GlobalApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cart from "./Cart";
import DarkModeToggle from "./DarkModeToggle";

function Header() {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dgbtcoker/image/upload/v1732198723/Maharaja_xz5083.png"
  );

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(
      (result) => {
        setUpdateCart(!updateCart);
        setCart(result.userCarts);
      }
    );
  };

  useEffect(() => {
    if (user) GetUserCart();
  }, [updateCart, user]);

  useEffect(() => {
    const handleDarkModeChange = () => {
      if (document.documentElement.classList.contains("dark")) {
        setImageUrl(
          "https://res.cloudinary.com/dgbtcoker/image/upload/v1732259351/Maharaja__1_-removebg-preview_fhsyw1.png"
        );
      } else {
        setImageUrl(
          "https://res.cloudinary.com/dgbtcoker/image/upload/v1732198723/Maharaja_xz5083.png"
        );
      }
    };

    handleDarkModeChange(); // Set initial image based on current mode
    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex justify-between items-center p-1 md:px-20 shadow-sm"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <Link href={"/?category=all"}>
        <Image src={imageUrl} alt="Maharaja" width={80} height={80} />
      </Link>

      <div className="hidden border p-2 rounded-lg bg-gray-200 w-96">
        <input type="text" className="bg-transparent w-full outline-none" />
        <Search style={{ color: "black" }} />
      </div>

      {isSignedIn ? (
        <div className="flex gap-5 items-center">
          <div className="left hidden md:flex">
            <DarkModeToggle />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex pt-2 gap-2 items-center cursor-pointer">
                <ShoppingCart />
                <label className="p-1 px-2 rounded-full bg-var(--bg-color)">
                  {cart?.length}
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Cart cart={cart} />
            </PopoverContent>
          </Popover>

          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
        </div>
      ) : (
        <div className="relative flex gap-5">
          
          <SignInButton mode="modal">
            <button className=" bg-orange-500 text-white font-small text-[13px] rounded-[0.9em] border-none tracking-[0.05em] flex items-center uppercase shadow-inner overflow-hidden relative h-[2.8em] px-[1.2em] pr-[3.3em] cursor-pointer">
              Order Now
              <div className="bg-white opacity-100 ml-[1em] absolute flex items-center justify-center h-[2.2em] w-[2.2em] rounded-[0.7em] shadow-[0.1em_0.1em_0.6em_0.2em] shadow-orange-700 right-[0.3em] transition-all duration-300 hover:w-[calc(100%-0.6em)] active:scale-95">
                <Pizza className="w-5 h-5 text-black" />
              </div>
            </button>
          </SignInButton>
          <div className="left hidden md:flex">
            <DarkModeToggle />
          </div>
          {/* <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton> */}
        </div>
      )}
    </div>
  );
}

export default Header;
