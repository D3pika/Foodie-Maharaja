'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import Intro from '../_components/Intro';
import RestroTabs from '../_components/RestroTabs';

function RestaurantDetails() {

  const param = usePathname();
  const [restaurant, setRestaurant] = React.useState([]);
  useEffect(() => {
    GetRestaurantDetail(param.split('/')[2]);
  })

  const GetRestaurantDetail=(restroSlug)=>{
      GlobalApi.GetBusinessDetail(restroSlug).then(result=>{
          // console.log(result);
          setRestaurant(result.restaurant);
      });
  }

  return (
    <div className='md:px-20 sm:px-10 px-5 relative mb-20'>
      <Intro restaurant={restaurant}/>
      <RestroTabs restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantDetails;
