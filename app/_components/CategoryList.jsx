'use client';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Update selected category based on query parameter
  useEffect(() => {
    // Safely check if router.query is defined and destructure category
    const { category } = router.query || {}; 
    setSelectedCategory(category || 'all');
  }, [router.query]); // Dependency on router.query to trigger re-render when the category changes

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then(result => {
      console.log(result.categories);
      setCategoryList(result.categories);
    });
  };

  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="flex gap-5 overflow-auto scrollbar-hide">
        {categoryList && categoryList.map((category, index) => (
          <Link href={'?category=' + category.slug} key={index} className={`flex flex-col items-center gap-2 border p-3 rounded-lg min-w-28
                    hover:cursor-pointer hover:bg-orange-50 hover:text-orange-600 hover:border-primary group ${selectedCategory === category.slug ? 'bg-orange-50 text-orange-600 border-primary' : ''}`}>
            <Image src={category.icon?.url} alt={category.name} width={80} height={80} className="hover:scale-105 transition-all duration-200 w-24 h-24 object-cover rounded-full" />
            <h2 className="text-sm font-medium">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
