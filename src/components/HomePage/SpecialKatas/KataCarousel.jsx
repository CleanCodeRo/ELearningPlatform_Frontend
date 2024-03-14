import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import NewKataCard from './NewKataCard';
import ModuleCard from '../ModuleCard';
import Loading from '../../Loading/Loading';

const KataCarousel = () => {
  const [katas, setKatas] = useState(null);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);

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
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        // navigate("/login");
        console.log(err)

      });
  }, []);



  return (
    <div id='kataHolder' className=' w-full relative'>
      {loading ? (
        <div id="loading" className="w-full h-[35rem] absolute top-14  flex items-center justify-center">
        <Loading />
      </div>
      ): (
        <div id='kataHolder' className='grid grid-cols-6 w-full relative'>
        {katas && katas.map((kata, index) => (
      
          <NewKataCard key={index} kata={kata} />
        
      ))}
      </div>
      )
    }

   
    </div>
      
    
  );
};

export default KataCarousel;


// {[...Array(30)].map((_, index) => (
//   <div key={index} className="mx-2">
//       <NewKataCard />
//   </div>
// ))}
