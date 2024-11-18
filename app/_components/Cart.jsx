import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import Link from 'next/link';

function Cart({cart}) {
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const CalculateCartAmount = cart.reduce((total, item) => total + item.price, 0);

    const RemoveItemFromCart = (id) => {
        // console.log(id);
        GlobalApi.DisconnectRestroFromUserCartItem(id).then(result => {
            // console.log(result);
            if(result){
                GlobalApi.DeleteItemFromCart(id).then(result => {
                    // console.log(result);
                    toast('Item Removed From Cart Successfully');
                    setUpdateCart(!updateCart);
                })
            }
        })
    }
  return (
    <div>
      <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
      <div className='mt-5 flex flex-col gap-2'>
        <h2 className='font-semibold'>My Orders</h2>
        {
            cart && cart.map((item, index) => {
                return(
               
                    <div key={index} className='flex justify-between gap-8 items-center'>
                        <div className='flex items-center gap-2'>
                            <Image src={item?.productImage} 
                            alt={item?.productName} 
                            width={40} 
                            height={40} 
                            className='rounded-lg h-[40px] w-[40px] object-cover'
                            />
                            <h2 className='text-sm'>{item.productName}</h2>
                        </div>
                        <h2 className='font-semibold flex gap-2'>₹{item.price}
                            <X className='h-4 w-4 text-red-500 cursor-pointer'
                            onClick={() => RemoveItemFromCart(item.id)}
                            />
                        </h2>
                    </div>
                )
                
            })}
            <Link href={'/checkout?restaurant=' + cart[0]?.restaurant?.name} className={'mt-5'}>
            <Button className='w-full'>Checkout <p className='text-lg font-bold'>₹{CalculateCartAmount}</p></Button>
            </Link>
            {/* <h2 className='font-semibold'>Total: </h2> */}
            
      </div>
    </div>
  )
}

export default Cart
