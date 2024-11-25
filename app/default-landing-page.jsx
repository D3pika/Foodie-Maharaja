"use client";
import React from 'react';
import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function DefaultLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dgbtcoker/image/upload/v1732309727/wallpaperflare.com_wallpaper_jeyqif.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
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

      {/* About Us Section */}
      <div className="flex flex-col items-center w-full p-10 bg-white dark:bg-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-300">About Us</h2>
            <p className="text-lg mb-4">Foodie Maharaja is your ultimate destination for discovering the best restaurants and food around you. Our mission is to bring you the finest dining experiences with a touch of royalty.</p>
            <p className="text-lg">Join us on a culinary journey and explore the diverse flavors and cuisines we have to offer.</p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <Image src="https://res.cloudinary.com/dgbtcoker/image/upload/v1732311332/MaharajaQueen_aefobm.jpg" alt="Maharaja" width={500} height={500} className='rounded-xl border-2 border-orange-400 md:ml-10'/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <p className="text-4xl font-bold mb-2">1000+</p>
            <p className="text-lg">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <p className="text-4xl font-bold mb-2">35+</p>
            <p className="text-lg">Menu Items</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <p className="text-4xl font-bold mb-2">24 Hours</p>
            <p className="text-lg">Operational</p>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col items-center w-full p-10 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Menu</h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Restaurant Menu</h3>
            <p className="text-lg">Explore our diverse menu offerings at our restaurant.</p>
            <Link href="/menus#restaurant-menu">
              <p className="mt-4 px-4 py-2 bg-orange-300 text-white rounded-lg">View Menu</p>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Food Truck Menu</h3>
            <p className="text-lg">Check out our food truck menu for delicious on-the-go options.</p>
            <Link href="/menus#food-truck-menu">
              <p className="mt-4 px-4 py-2 bg-orange-300 text-white rounded-lg">View Menu</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="p-10 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Location</h2>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.6808258848105!2d76.05057072528021!3d30.783536333176137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910749c82fe8e05%3A0xb7ae48057cf27655!2sMaharaja%20Queen%20Food%20Court!5e0!3m2!1sen!2sin!4v1732312073790!5m2!1sen!2sin"
            width="1200"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col items-center w-full p-10 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p className="text-lg">info@foodiemaharaja.com</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Phone</h3>
            <p className="text-lg">+1 234 567 890</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Address</h3>
            <p className="text-lg">123 Foodie St, Maharaja City, IN</p>
          </div>
        </div>
      </div>
    </div>
  );
}