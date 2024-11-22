import { Star, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function BusinessItem({business}) {
  return (
    <Link href={'/restaurant/' + business?.slug} className="p-3 hover:border-orange-400 border-2 rounded-xl transition-all ease-in-out duration-100 hover-bg">
      {/* console.log(restaurant); */}
      <Image src={business?.banner?.url} alt={business?.name} width={500} height={130} 
      className='h-[280px] rounded-xl object-cover'/>
      <div className='mt-2'>
        <h2 className='text-lg font-semibold'>{business?.name}</h2>
        <div className="flex justify-between items-center">
            <div className='flex items-center gap-2'>
                {/* <Image src='/star-solid.svg' width={20} height={20} alt='star'/> */}
                {/* <label className='text-gray-500 text-sm flex items-center gap-1'>4.5</label> */}
                <h2 className='text-gray-500 text-sm'>{business?.restroType[0]}</h2>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default BusinessItem;
