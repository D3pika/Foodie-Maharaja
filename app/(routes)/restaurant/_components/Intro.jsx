import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function Intro({ restaurant }) {
  const bannerUrl = restaurant?.banner?.url;
  const altText = restaurant?.name || 'Restaurant Banner';

  return (
    <div>
      <div className="relative w-full h-[280px] sm:h-[400px] lg:h-[300px]">
        {bannerUrl ? (
          <Image
            src={bannerUrl}
            alt={altText}
            fill
            className="rounded-xl object-contain sm:object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-gray-300 flex items-center justify-center">
            <p className="text-gray-500">No Banner Available</p>
          </div>
        )}
      </div>

      <h1 className='text-3xl font-bold mt-2'>{restaurant?.name}</h1>

      <div className='flex items-center gap-2 mt-2'>
        {/* <Image src='/star-solid.svg' width={20} height={20} alt='star'/> */}
        {/* <label className='text-gray-500 text-sm flex items-center gap-1'>4.5 (12)</label> */}
      </div>

      <h2 className='text-gray-700 mt-2 flex items-center gap-2'>
        <MapPin />
        {restaurant?.address}
      </h2>
    </div>
  );
}

export default Intro;
