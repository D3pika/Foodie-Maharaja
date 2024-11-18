"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function ConfirmationPage() {
  const router = useRouter();

  // Handle redirect after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/?category=all");
    }, 7000); // Redirect after 7 seconds

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Order Confirmed</h1>
        <p className="text-gray-600 mt-2 text-lg">Congrats! Your order has been placed.</p>
        <p className="text-gray-500 mt-2">Your food will soon meet you.</p>

        <div className="mt-6 text-sm text-gray-500">Redirecting to home in 7 seconds...</div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
