import { FacebookIcon, InfoIcon, InstagramIcon, LocateIcon, TwitterIcon } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <section className="bg-(var(--bg-color)) mt-20">
      <div className="max-w-screen-xl px-4 py-1 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        
        <div className="flex justify-center mt-8 space-x-6">
          <a href="https://www.facebook.com/p/Maharaja-Queen-Food-Court-Doraha-100093262189437/" className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
            <FacebookIcon/>
          </a>
          <a href="https://www.instagram.com/mqfoodcourtofficial/?hl=en" className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
            <span className="sr-only">Instagram</span>
            <InstagramIcon/>
          </a>
          <a href="https://www.justdial.com/Doraha/Mmaharaja-Queen-Opposite-Sidhu-Nursing-Home-Nh-1-Doraha/0161PX161-X161-160511192455-J3I2_BZDET" className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
            <span className="sr-only">Twitter</span>
            {/* <TwitterIcon/> */}
            <InfoIcon/>
          </a>

          <a href="https://g.co/kgs/bu6ieBg"className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
            <span className="sr-only">Location</span>
            <LocateIcon/>
          </a>
          
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400 dark:text-gray-500">
          © Maharaja Queen Restaurant
        </p>
      </div>
    </section>
  );
}

export default Footer;