import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'

function ReviewList({reviews}) {
  return (
    <div className='flex flex-col gap-5 p-4 bg-gray-100 rounded-lg shadow-md'>
  {reviews && reviews?.map((review, index) => (
    <div key={index} className='flex gap-10 items-center border border-gray-400 rounded-xl py-4 p-8'>
      <Image src={review?.profileImage} alt={review?.userName} width={50} height={50} className='rounded-full object-cover' />
      <div className='flex flex-col gap-1'>
        <h2 className='text-lg font-semibold text-gray-700'>{review?.userName}</h2>
        <div className='flex items-center gap-2'>
          <ReactRating style={{ maxWidth: 100 }} value={review?.star} size="20px" readOnly />
          <span className='text-sm text-gray-500'>{review?.star} / 5</span>
        </div>
        <p className='text-gray-600'>{review?.reviewText}</p>
        <hr className='border-gray-200' />
        <span className='text-sm text-gray-500'>Review Uploaded on :  {moment(review?.publishedAt).format('DD-MMM-YYYY')} </span>
      </div>
    </div>
  ))}
</div>
  )
}

export default ReviewList
