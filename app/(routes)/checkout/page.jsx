"use client";
import { Suspense } from "react";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation"; // Updated import to use useRouter
import React, { useContext, useEffect, useState } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { toast } from "sonner";

function Checkout() {
  const router = useRouter(); // Initialize router
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  // Check if query exists and extract the 'restaurant' query parameter
  const restaurant = router?.query?.restaurant || ''; // Default to empty string if undefined

  useEffect(() => {
    console.log(restaurant); // Logging the restaurant parameter
    if (user) {
      GetUserCart();
    }
  }, [user, updateCart, restaurant]); // Add 'restaurant' as a dependency

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(
      (result) => {
        setCart(result?.userCarts);
        calculateSubtotal(result?.userCarts);
      }
    );
  };

  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    setSubtotal(total);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const GST_RATE = 0.18;

  useEffect(() => {
    console.log(restaurant); // Logging the restaurant parameter for debug
  }, [restaurant]); // Use 'restaurant' as a dependency

  const validateForm = () => {
    const newErrors = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phone.match(/^\+?[0-9]*$/)) {
      newErrors.phone = "Phone number can only contain + and numbers.";
    }
    if (!zip.match(/^[0-9]+$/)) {
      newErrors.zip = "ZIP code must only contain numbers.";
    }
    if (!username) {
      newErrors.username = "First Name is required.";
    }
    if (!address) {
      newErrors.address = "Address is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addToOrder = () => {
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      orderAmount: totalAmount,
      restaurantName: restaurant, // Use the 'restaurant' parameter directly
      userName: user?.fullName,
      address: address,
      zipCode: zip,
      phone: phone,
    };
    GlobalApi.CreateNewOrder(data).then((result) => {
      const resultId = result?.createOrder?.id;
      if (resultId) {
        cart.forEach((item) => {
          GlobalApi.UpdateOrderToAddOrderItems(
            item?.productName,
            item?.price,
            resultId,
            user?.primaryEmailAddress?.emailAddress
          ).then((result) => {
            console.log(result);
          });
        });
      }
    });

    handlePayment();

    if (validateForm()) {
      toast.success(
        <div className="flex gap-2 text-sm font-bold">
          <CheckCircle className="text-green-500 text-lg" /> Order Placed
          Successfully, Forwarding to Payment Gateway..
        </div>
      );
    }
  };

  const gstAmount = subtotal * GST_RATE;
  const totalAmount = subtotal + parseFloat(gstAmount.toFixed(2));

  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY,
      amount: totalAmount * 100,
      currency: "INR",
      name: "Maharaja Queen Restaurant",
      description: "Transaction",
      handler: (response) => {
        console.log(response);

        const query = new URLSearchParams({
          transaction_id: response.razorpay_payment_id,
          amount: totalAmount,
          email: email,
        });
        toast("Payment Successful!");
        router.replace(`/confirmation?${query.toString()}`);
      },
      prefill: {
        name: username,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl font-extrabold text-var(--text-color) uppercase mb-12">
            Checkout
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-var(--bg-color) rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-var(--text-color) mb-6">
                Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
                    placeholder="First Name"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-2 ">{errors.username}</p>
                  )}
                </div>
                <div>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-black">
                <div>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
                    placeholder="ZIP"
                    onChange={(e) => setZip(e.target.value)}
                    value={zip}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm mt-2">{errors.zip}</p>
                  )}
                </div>
              </div>
              <div className="mt-6">
                <input
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-black"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-2">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="bg-orange-100 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
                Order Summary
              </h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-600">GST (18%)</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{gstAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-600">Total</span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={addToOrder}
                disabled={isLoading}
                className="w-full py-3 text-lg font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Checkout;
