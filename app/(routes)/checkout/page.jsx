"use client";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRazorpay } from "react-razorpay";
import { toast } from "sonner";

function Checkout() {
  const params = useSearchParams();
  const { user } = useUser();
  const [cart, setCart] = useState([]);
  const { updateCart } = useContext(CartUpdateContext);

  useEffect(() => {
    if (user) {
      GetUserCart();
    }
  }, [user, updateCart]);

  const GetUserCart = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GlobalApi.GetUserCart(user.primaryEmailAddress.emailAddress)
        .then((result) => {
          if (result?.userCarts) {
            setCart(result.userCarts);
            calculateSubtotal(result.userCarts);
          } else {
            toast.error("Failed to load cart data.");
          }
        })
        .catch(() => {
          toast.error("Error fetching cart data.");
        });
    }
  };

  const [subtotal, setSubtotal] = useState(0);

  const calculateSubtotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setSubtotal(total);
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const GST_RATE = 0.18; // 18% GST

  const router = useRouter();

  useEffect(() => {
    console.log(params.get("restaurant"));
  }, [params]);

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
    if (!validateForm()) {
      return;
    }

    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      orderAmount: totalAmount,
      restaurantName: params.get("restaurant"),
      userName: user?.fullName,
      address: address,
      zipCode: zip,
      phone: phone,
    };

    GlobalApi.CreateNewOrder(data)
      .then((result) => {
        const resultId = result?.createOrder?.id;
        if (resultId) {
          cart.forEach((item) => {
            GlobalApi.UpdateOrderToAddOrderItems(
              item.productName,
              item.price,
              resultId,
              user?.primaryEmailAddress?.emailAddress
            ).catch((err) => console.error("Error adding items to order", err));
          });
        }
      })
      .catch(() => {
        toast.error("Error placing order.");
      });

    handlePayment();
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
        const query = new URLSearchParams({
          transaction_id: response.razorpay_payment_id,
          amount: totalAmount,
          email: email,
        });
        toast.success("Payment Successful!");
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
          <h2 className="text-center text-3xl font-extrabold text-gray-800 uppercase mb-12">
            Checkout
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing Details */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                Billing Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="First Name"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-2">{errors.username}</p>
                  )}
                </div>
                <div>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-2">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-6">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-600">GST (18%)</span>
                <span className="text-lg font-bold text-gray-800">₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-600">Total</span>
                <span className="text-xl font-bold text-gray-800">₹{totalAmount}</span>
              </div>
              <Button onClick={addToOrder} disabled={isLoading}>
                Proceed to Payment
              </Button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Checkout;
