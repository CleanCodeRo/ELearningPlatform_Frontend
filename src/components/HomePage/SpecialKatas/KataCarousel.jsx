import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewKataCard from './NewKataCard';
import Loading from '../../Loading/Loading';
import ReactPaginate from 'react-paginate';
import { Button } from '@material-tailwind/react';

const numberOfItems = 5;
let numberOfPages = 0

const KataCarousel = () => {
  const [katas, setKatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/katas/getKatas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body : JSON.stringify({
        page : page,
        numberOfItems : numberOfItems,
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setKatas(data.katas);
        numberOfPages = Math.ceil( data.numberOfKatas / numberOfItems );
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [page]);

  const handlePageClick = (e) => {
    setPage(e.selected);
  }


  return (
    <div id='kataHolder' className=' w-full relative'>
      {loading ? (
        <div id="loading" className="w-full h-[35rem] absolute top-14  flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div id='kataHolder' className='grid grid-cols-3 xl:grid-cols-4 px1400:grid-cols-5 px1669:grid-cols-6 w-full relative'>
          <ReactPaginate
            className=' col-span-full text-first flex justify-center items-center my-3 '
            pageClassName=" mx-1 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-300 duration-200"
            breakClassName=" p-1"
            activeClassName="bg-second text-sixth shadow-sm shadow hover:text-first duration-200"
            marginPagesDisplayed={3}
            breakLabel=". . ."
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={numberOfPages}
            previousLabel={<Button className='mx-1 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 bg-transparent text-second text-md duration-200'><i className="fa-solid fa-arrow-left"></i></Button>}
            nextLabel={<Button className='mx-1 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 bg-transparent text-second text-md duration-200'><i className="fa-solid fa-arrow-right"></i></Button>}
            renderOnZeroPageCount={null}
          />

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
