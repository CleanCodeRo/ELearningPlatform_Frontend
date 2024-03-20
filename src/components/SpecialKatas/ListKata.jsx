import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../Loading/Loading';
import ReactPaginate from 'react-paginate';
import { Button } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router';
import KataCard from './KataKard';

const numberOfItems = 5;
let numberOfPages = 0

const ListKata = () => {
  const [katas, setKatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (pageNumber) {
      setKatas([]);
      fetch("http://localhost:8080/katas/getKatas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
        body: JSON.stringify({
          page: pageNumber,
          numberOfItems: numberOfItems,
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.katas.length == 0 && pageNumber >= 0){ // case where kata is last on page
            navigate(`/home/dojo/${pageNumber - 1}`)
          }
          setKatas([...data.katas]);
          numberOfPages = Math.ceil(data.numberOfKatas / numberOfItems);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }, [pageNumber, refresh]);

  const handlePageClick = (e) => {
    navigate(`/home/dojo/${e.selected}`)
  }




  return (
    <div id='kataHolder' className=' w-full relative'>
      <ReactPaginate
            className=' w-full text-first flex justify-center items-center my-3 '
            pageClassName=" mx-1 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-300 duration-200"
            breakClassName=" p-1"
            activeClassName="bg-second text-sixth shadow-sm shadow hover:text-first duration-200"
            marginPagesDisplayed={3}
            breakLabel=". . ."
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={numberOfPages}
            forcePage={pageNumber * 1}
            previousLabel={<Button className='mx-1 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 bg-transparent text-second text-md duration-200'><i className="fa-solid fa-arrow-left"></i></Button>}
            nextLabel={<Button className='mx-1 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 bg-transparent text-second text-md duration-200'><i className="fa-solid fa-arrow-right"></i></Button>}
            renderOnZeroPageCount={null}
          />

      {loading ? (
        <div id="loading" className="w-full h-[35rem] absolute top-14  flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        
        <div id='kataHolder' className='grid grid-cols-3 xl:grid-cols-4 px1400:grid-cols-5 px1669:grid-cols-6 w-full relative'>
          {katas && katas.map((kata, index) => (
            <KataCard key={index} kata={kata} deleteEvent={deleteKata} setRefresh={setRefresh} />
          ))}
        </div>
      )
      }
    </div>
  );
};

export default ListKata;

export const deleteKata = (e, kataId, setRefresh) => {
  e.stopPropagation();

  fetch(`http://localhost:8080/katas/${kataId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
    },
  }).then(res => res.json())
    .then(() => {
       setRefresh(Math.random())
    })
};