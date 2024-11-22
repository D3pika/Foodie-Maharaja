import React from 'react';

function AboutSection({ restaurant }) {
  const renderAboutContent = () => {
    switch (restaurant) {
      case 'maharaja-queen-restaurant':
        return (
          <div>
            <h2>Maharaja Queen Restaurant</h2>
            <p>Welcome to Maharaja Queen Restaurant, where we serve the finest Indian cuisine with a royal touch. Our chefs use the freshest ingredients to create mouth-watering dishes that will leave you wanting more.</p>
            <p>Address: 123 Royal Street, Cityname</p>
            <p>Contact: (123) 456-7890</p>
          </div>
        );
      case 'mq-food-court':
        return (
          <div>
            <h2>MQ Food Court</h2>
            <p>MQ Food Court offers a variety of delicious food options from different cuisines. Whether you're in the mood for Indian, Chinese, or Continental, we have something for everyone.</p>
            <p>Address: 456 Market Road, Cityname</p>
            <p>Contact: (987) 654-3210</p>
          </div>
        );
      case 'mq-chaat-stop':
        return (
          <div>
            <h2>MQ Chaat Stop</h2>
            <p>At MQ Chaat Stop, we bring you the best street food experience with our wide range of chaats and snacks. Enjoy the authentic flavors of India in every bite.</p>
            <p>Address: 789 Snack Lane, Cityname</p>
            <p>Contact: (555) 123-4567</p>
          </div>
        );
      default:
        return <p>Restaurant information not available.</p>;
    }
  };

  return (
    <div>
      {renderAboutContent()}
    </div>
  );
}

export default AboutSection;