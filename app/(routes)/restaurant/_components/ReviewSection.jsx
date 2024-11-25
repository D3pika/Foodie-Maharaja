import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import ReviewList from './ReviewList';


function ReviewSection({restaurant}) {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState();
    const {user} = useUser();
    const [reviews, setReviews] = useState();

    const handleSubmit = () => {
        // console.log(rating, reviewText, restaurant.slug);
        const data = {
            email:user?.primaryEmailAddress?.emailAddress,
            profileImage:user?.imageUrl,
            userName:user?.fullName,
            star:rating,
            reviewText:reviewText,
            RestroSlug:restaurant.slug,
        };
        GlobalApi.AddNewReview(data).then(result => {
            // console.log(result);
            toast('Review Added Successfully');
        });

    }

    useEffect(() => {
        restaurant && getReviews();
    }, [restaurant]);

    const getReviews = () => {
        GlobalApi.GetReviews(restaurant.slug).then(result => {
            // console.log(result);
            setReviews(result?.reviews);
        });
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10 '>
        <div className='flex flex-col gap-4 p-5 rounded-lg shadow-lg border w-full'>
            <h2 className='font-bold text-lg'>Add your Review.</h2>
            <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
            <Textarea onChange={(e) => setReviewText(e.target.value)}/>
            <Button disabled={rating==0||!reviewText}
            onClick={()=>handleSubmit(rating,reviewText)}>
                Submit
            </Button>
        </div>  
        <div className='col-span-2'>
            <h2 className='font-bold text-lg'>Reviews</h2>
            <ReviewList reviews={reviews}/>
            {/* {reviews} */}
        </div>      
    </div>
  )
}

export default ReviewSection
