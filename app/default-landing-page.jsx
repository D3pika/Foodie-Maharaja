"use client";
import React from "react";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import HeroSection from "./_components/HeroSection";

export default function DefaultLandingPage() {
  return (
    <div className=" bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <div className="flex flex-col items-center p-5 justify-center md:p-28 bg-white dark:bg-gray-800 gap-10">
        <div className="flex flex-col md:flex-row items-center justify-evenly w-full mb-10 gap-20">
          <div className="md:w-2/3 gap-x-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">
              Welcome to
            </h2>
            <h1 className="text-4xl font-bold mb-4 text-gray-300">
              Foodie Maharaja
            </h1>
            <p className="text-lg mb-4">
              Foodie Maharaja has been serving delightful experiences through
              the art of cooking for four decades. A cozy, relaxing space
              combined with flavourful dishes makes it a first choice for every
              foodie in town. It provides a wide range of items to choose from
              and lets everyone indulge in an experience of pleasing their taste
              buds. We provides a wide range of cuisines and dishes to choose
              from so that every foodie in town has their best experience here.
              We are known to be the best place to dine in Doraha. We have
              always won the hearts of our customers with appetizing dishes and
              friendly behaviour. It is the best choice for everyone who wants
              to enjoy the best quality food at reasonable prices.
            </p>
            <p className="text-lg">
              Join us on a culinary journey and explore the diverse flavors and
              cuisines we have to offer.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <Image
              src="https://res.cloudinary.com/dgbtcoker/image/upload/v1732311332/MaharajaQueen_aefobm.jpg"
              alt="Maharaja"
              width={700}
              height={500}
              className="rounded-xl border-2 border-orange-400 md:ml-10"
            />
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

      {/* Second Hero Section */}
      <div className="h-[45vh] w-full">
        <div
          className="p-10 relative flex items-center justify-center bg-cover bg-center transition-all duration-1000 w-full h-[45vh] bg-no-repeat"
          style={{
            transition: "background-image 1s ease-in-out",
            backgroundImage: `url('https://res.cloudinary.com/dgbtcoker/image/upload/v1732562564/360_F_603640779_QNVbk3tSd5nEU1uAO7RifpHUjLZCsjDJ_yse4da.jpg')`,
          }}
        >
          <div className="flex-col items-center justify-center">
            <h1 className="text-xl font-bold item-center justify-center text-white">
              We Create Delicious Memories.
            </h1>
            <p className="text-6xl font-bold text-white">Eat Good Feel Good</p>
          </div>
        </div>
      </div>

      {/* Outlet Section */}
      <div className=" flex flex-col items-center p-10 bg-white dark:bg-gray-800">
        <p className="text-3xl text-center font-bold mb-4 text-gray-300">Maharaja Queen Restaurant</p>
        <p className="text-3xl font-bold mb-4 text-gray-300">Our Outlets</p>
        <p className="text-lg mb-4">
          We provide a wide range of cuisines and dishes to choose from so that
          every foodie in town has their best experience with us.
        </p>
        <div className="gap-4 flex flex-col md:flex-row items-center justify-evenly w-[100%] space-y-4 md:space-y-0 md:space-x-4">
          <Image
            src="https://res.cloudinary.com/dgbtcoker/image/upload/v1732311332/MaharajaQueen_aefobm.jpg"
            alt="Maharaja"
            width={500}
            height={500}
            className="rounded-2xl border-2 border-white md:ml-10"
          />
          <Image
            src="https://res.cloudinary.com/dgbtcoker/image/upload/v1732575187/mq-cb_ivjfq8.jpg"
            alt="Maharaja"
            width={350}
            height={500}
            className="rounded-2xl border-2 border-white md:ml-10"
          />
          <Image
            src="https://res.cloudinary.com/dgbtcoker/image/upload/v1732575187/mq-fc_iohgvn.jpg"
            alt="Maharaja"
            width={350}
            height={500}
            className="rounded-2xl border-2 border-white md:ml-10"
          />
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
      <div className="flex-col items-center w-full p-10 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p className="text-lg">info@foodiemaharaja.shop</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Phone</h3>
            <p className="text-lg">+918130241880</p>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2">Address</h3>
            <p className="text-lg">Grand Trunk Rd, opp. mcdonalds, Doraha, Punjab 141421</p>
          </div>
        </div>
      </div>
    </div>
  );
}
