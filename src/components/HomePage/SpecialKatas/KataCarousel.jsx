import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import NewKataCard from './NewKataCard';
import ModuleCard from '../ModuleCard';

const KataCarousel = ({user}) => {
  const [katas, setKatas] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/katas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setKatas(data);
        console.log(data);
      })
      .catch((err) => {
        // navigate("/login");
        console.log(err)

      });
  }, []);





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
    <Slider {...settings} className="flex mx-auto w-4/5 mt-4">
      {katas && katas.map((kata, index) => (
      
          <NewKataCard key={index} kata={kata} userRole={user}/>
        
      ))}
    </Slider>
  );
};

export default KataCarousel;


// {[...Array(30)].map((_, index) => (
//   <div key={index} className="mx-2">
//       <NewKataCard />
//   </div>
// ))}
