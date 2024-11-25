"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

const HeroSection = () => {
  const images = [
    "https://res.cloudinary.com/dgbtcoker/image/upload/v1732309727/wallpaperflare.com_wallpaper_jeyqif.jpg",
    "https://res.cloudinary.com/dgbtcoker/image/upload/v1732562565/5cdd63169d39a436a83cfdb9_1558012694827_rdgi6n.jpg",
    "https://res.cloudinary.com/dgbtcoker/image/upload/v1732562564/360_F_275392381_9upAWW5Rdsa4UE0CV6gRu2CwUETjzbKy_bhtbvo.jpg",
    "https://res.cloudinary.com/dgbtcoker/image/upload/v1732562564/360_F_603640779_QNVbk3tSd5nEU1uAO7RifpHUjLZCsjDJ_yse4da.jpg",
    "https://res.cloudinary.com/dgbtcoker/image/upload/v1732562564/le-chantecler_u5byz6.jpg"    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change background every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div
      className="relative flex items-center justify-center bg-cover bg-center transition-all duration-1000 w-full h-[100vh] bg-no-repeat"
      style={{
        transition: "background-image 1s ease-in-out",
        backgroundImage: `url('${images[currentIndex]}')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="p-5 relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">Welcome to Foodie Maharaja</h1>
        <p className="text-xl mb-8 text-white">Discover the best restaurants and food around you.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/sign-up">
            <SignUpButton mode="modal">
              <button className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-orange-300 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-500 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-orange-400 hover:text-red-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group">
                Explore Now, Cure the Hunger.
                <svg
                  className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-800 group-hover:fill-gray-800"
                  ></path>
                </svg>
              </button>
            </SignUpButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
