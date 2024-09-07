import { createSelector } from '@reduxjs/toolkit';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';


export const formatPrice = (price)=>{
    const dollarAmount = new Intl.NumberFormat('en-us',{
        style:'currency',
        currency:'USD'
    }).format((price/100).toFixed(2));

    return dollarAmount;
}

// export const single_product_url = `https://www.course-api.com/react-store-single-product?id=`;

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }

  return ['all', ...new Set(unique)]
}

export const services = [
    {
      id: 1,
      icon: <GiCompass />,
      title: 'mission',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
    },
    {
      id: 2,
      icon: <GiDiamondHard />,
      title: 'vision',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
    },
    {
      id: 3,
      icon: <GiStabbedNote />,
      title: 'history',
      text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
    },
  ];


