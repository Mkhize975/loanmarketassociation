import React from 'react'
import {roomsDummyData} from '../data/roomsDummyData';
import HotelCard from './HotelCard.jsx';
import Title from './Title.jsx';
import {useNavigate} from 'react-router-dom';

const FeaturedDestination = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 bg-slate-50 py-20'> 
        

            <Title title='Featured Destinations' subTitle='Explore our most popular destinations'/>

         <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {roomsDummyData.slice(0, 4).map((room, index) => (
                <HotelCard key={room._id} room={room} index={index} />
            ))}
        </div>
           <button onClick={()=>{navigate('/rooms'); scrollTo(0,0);}}
           className='mt-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
            View All Destinations
           </button>

        </div>
    )
}

export default FeaturedDestination;