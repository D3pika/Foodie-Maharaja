"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";

function ConfirmationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [cart, setCart] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);

  const transactionId = params.get("transaction_id");
  const amount = params.get("amount");
  const userEmail = params.get("email"); 

  // Handle Go to Home and flush cart.
  const handleGoToHome = async () => {
    router.replace("/?category=all");
  };

  // Validation for missing parameters.
  if (!transactionId || !amount ) {
    setTimeout(() => router.replace("/?category=all"), 3000);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Invalid Transaction</h1>
          <p className="text-gray-600 mt-2">Redirecting to the home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2v-7a2 2 0 00-2-2h-3l-2-2H7a2 2 0 00-2 2v9a2 2 0 002 2z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-green-600 mt-4">Order Confirmed!</h1>
          <p className="text-gray-700 mt-2">Thank you for your order! Your food is on its way.</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Transaction Details</h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <p>
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p>
              <strong>Paid Amount:</strong> ₹{amount}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            className="w-full bg-green-500 text-white hover:bg-green-400"
            onClick={handleGoToHome}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
