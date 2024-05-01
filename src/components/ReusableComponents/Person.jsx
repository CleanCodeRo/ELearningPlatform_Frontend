import React from 'react';

export default function Person({ rank, name, xp , time }) {
    const getPlaceImage = (rank) => {
        if (rank <= 3) {
            return <img src={`/images/quest-leaderboard-${rank}-place.png`} className='scale-50' alt={`${rank} place`} />;
        } else {
            return <p className='text-xl flex items-center justify-center'>{rank}</p>;
        }
    };

    return (
        <div id='titles' className='w-full h-12 mt-1 flex flex-row px-7 text-[#5f5f5d]'>
            <div className='w-20 text-xl flex items-center justify-center'>
                {getPlaceImage(rank)}
            </div>
            <div className="w-2/6 flex items-center  line-clamp-1 pl-14">
                <p className='text-xl'>{name}</p>
            </div>
            <div className="w-1/3 flex items-center justify-center line-clamp-1">
                <p className='text-xl'>Module 2</p>
            </div>
            <div className="w-1/3 flex items-center justify-center">
                <p className='text-xl'>{xp ? `${xp}xp` : '0xp'}</p>
            </div>
        </div>
    );
}

