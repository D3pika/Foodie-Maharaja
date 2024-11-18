"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Search, ShoppingCart } from "lucide-react";
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

function Header() {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(
      (result) => {
        // console.log(result);
        setUpdateCart(!updateCart);
        setCart(result.userCarts);
      }
    );
  };

  useEffect(() => {
    // console.log("Execute Me HEADER.JSX");
    if (user) GetUserCart();
  }, [updateCart, user]);

  // GetUserCart();

  return (
    <div className="flex justify-between items-center p-1 md:px-20 shadow-sm">
      <Link href={"/?category=all"}>
        <Image src="/maharaja.png" alt="Maharaja" width={80} height={80} />
      </Link>

      <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
        <input type="text" className="bg-transparent w-full outline-none" />
        <Search />
      </div>

      {isSignedIn ? (
        <div className="flex gap-5 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex pt-2 gap-2 items-center cursor-pointer">
                <ShoppingCart />
                <label className="p-1 px-2 rounded-full bg-slate-200">
                  {cart?.length}
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Cart cart={cart}/>
            </PopoverContent>
          </Popover>

          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
        </div>
      ) : (
        <div className="flex gap-5">
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header;
