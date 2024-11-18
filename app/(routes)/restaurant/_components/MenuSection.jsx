import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { IndianRupeeIcon, SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";

function MenuSection({ restaurant }) {
  const [menuItemList, setMenuItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useUser();
  const {updateCart, setUpdateCart}=useContext(CartUpdateContext);

  const FilterMenu = (category) => {
    const result = restaurant?.menu?.filter((item) => item.category === category);
    setMenuItemList(result[0]);
    setSelectedCategory(category);
  };

  // Set the first category as default only on the initial render
  useEffect(() => {
    if (restaurant?.menu?.length > 0 && !selectedCategory) {
      const firstCategory = restaurant.menu[0].category;
      FilterMenu(firstCategory);
    }
  }, [restaurant]); 


  const addToCartHandler = (item) => {
    toast('Adding to cart');
    const data={
      email:user?.primaryEmailAddress?.emailAddress,
      name:item?.name,
      productImage:item?.productImage?.url,
      price:item?.price,
      restaurantSlug:restaurant?.slug
    }
    GlobalApi.AddToCart(data).then(result=>{
      console.log(result);
      setUpdateCart(!updateCart);
      toast('Added to cart')
  },(error) => {
    // console.error(error);
    toast('Failed to add item to the cart');
  })
  };


  return (
    <div>
      <div className="grid grid-cols-4 mt-2">
        {/* Sidebar for larger screens */}
        <div className="hidden md:flex flex-col mr-10 gap-2">
          {restaurant?.menu?.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex justify-start ${
                selectedCategory === item.category ? "bg-orange-100" : ""
              }`}
              onClick={() => FilterMenu(item.category)}
            >
              <p className="text-md font-semibold">{item.category}</p>
            </Button>
          ))}
        </div>

        {/* Dropdown for smaller screens */}
        <div className="md:hidden col-span-4 mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => FilterMenu(e.target.value)}
            className="w-full p-2 border rounded-md border-slate-300"
          >
            {restaurant?.menu?.map((item, index) => (
              <option key={index} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Items */}
        <div className="md:col-span-3 col-span-4">
          <h2 className="text-xl font-extrabold">{menuItemList?.category}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {menuItemList?.menuitem?.map((item, index) => (
              <div
                key={index}
                className="p-2 flex items-center gap-3 border rounded-xl border-slate-300 hover:border-orange-900 cursor-pointer"
              >
                <Image
                  src={item?.productImage?.url}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="object-cover w-[120px] h-[120px] rounded-xl"
                />
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold">{item.name}</h2>
                  <div className="flex items-center font-semibold text-xl text-red-400">
                    <IndianRupeeIcon />
                    {item.price}
                  </div>
                  <Button variant="ghost" className="border-2 rounded-xl  flex gap-2" onClick={() => addToCartHandler(item)}><SquarePlus/>
                  Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuSection
