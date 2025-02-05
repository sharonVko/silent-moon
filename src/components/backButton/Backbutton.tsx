import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Backbutton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button
      className="absolute top-1.5 left-2 z-20 bg-[#FAF2DA] rounded-4xl w-[55px] h-[55px] flex justify-center items-center"
      onClick={handleClick}>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.8491 10.5L3.57289 10.5L9.98418 17.0889L8.60878 18.5L0.378077 10.0667C0.0748413 9.75555 0.0748413 9.25555 0.378077 8.94444L8.60879 0.499999L9.98418 1.91111L3.57289 8.5L18.8491 8.5L18.8491 9.5L18.8491 10.5Z"
          fill="#4A503D"
        />
      </svg>
    </button>
  );
};
