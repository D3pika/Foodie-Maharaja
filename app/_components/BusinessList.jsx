"use client";
import { useSearchParams } from 'next/navigation';
import { React, useEffect, useState, Suspense } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import BusinessItem from './BusinessItem';

function BusinessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState('all');
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params && setCategory(params.get('category'));
    params && getBusinessList(params.get('category'));
  }, [params]);

  const getBusinessList = (category_) => {
    setLoading(true);
    GlobalApi.GetBusiness(category_).then(result => {
      setBusinessList(result?.restaurants);
      setLoading(false);
    });
  };

  return (
    <div className='md:px-60 sm:px-10 px-5 relative mb-20'>
      <h1 className=' pt-5 text-2xl font-bold uppercase'>{category} Restaurants. </h1>
      <h2 className='text-sm text-gray-500 '>{businessList?.length} Results</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7'>
        {!loading ? (
          businessList?.map((restaurants, index) => (
            <BusinessItem key={index} business={restaurants} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default function BusinessListWithSuspense() {
  return (
    <Suspense fallback={<div>Loading Search Parameters...</div>}>
      <BusinessList />
    </Suspense>
  );
}
