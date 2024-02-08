import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import KataCard from './KataCard';
import NewKataCard from './NewKataCard';

const Carousel = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 2054,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
            },
          },
          {
            breakpoint: 1720,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
            },
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1080,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 745,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
    };
      
    return (
      <Slider {...settings} className="flex mx-auto w-4/5">
      {[...Array(30)].map((_, index) => (
          <div key={index} className="mx-2">
              <NewKataCard />
          </div>
      ))}
  </Slider>
    );
};

export default Carousel;
