import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from '../Loading/Loading';
import ReactPaginate from 'react-paginate';
import { Button } from '@material-tailwind/react';
import { useNavigate, useParams } from 'react-router';
import KataCard from './KataKard';

const ListKata = ({katas, numberOfPages, loadingKatas, setRefreshKatas }) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();


  const handlePageClick = (e) => {
    navigate(`/dojo/${e.selected}`)
  }

  return (
    <div id='kataHolder' className=' w-full relative py-10'>
      <ReactPaginate
            className=' w-full text-first flex justify-center items-center mb-7 mt-3'
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

      {loadingKatas ? (
        <div id="loading" className="w-full h-[35rem] absolute top-14  flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        
        <div id='kataHolder' className='grid grid-cols-3 xl:grid-cols-4 px1400:grid-cols-5 px1669:grid-cols-6 w-full relative gap-y-10'>
          {katas && katas.map((kata, index) => (
            <KataCard key={index} kata={kata} deleteEvent={deleteKata} setRefreshKatas={setRefreshKatas} />
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