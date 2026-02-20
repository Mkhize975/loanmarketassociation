import React from 'react'
import starIconFilled from '../assets/starIconFilled.png';
import starIconOutlined from '../assets/starIconOutlined.png';

const assets = {
    starIconFilled,
    starIconOutlined
};

const StarRating = ({rating = 4}) => {
    return (
        <>
    {Array(5).fill('').map((_, index) => (
                    <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon" className='w-5 h-5'/>
                ))}
      </>
    )
}
 export default StarRating