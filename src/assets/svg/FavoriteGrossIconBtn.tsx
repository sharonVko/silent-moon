import { useState } from 'react';

export const FavoriteGrossIconBtn = () => {
  const [fav, setFav] = useState<boolean>(false);
  return (
    <div className="absolute right-1.5 top-1.5" onClick={() => setFav(prev => !prev)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
        <rect
          opacity="0.5"
          x="55"
          y="55"
          width="55"
          height="55"
          rx="27.5"
          transform="rotate(-180 55 55)"
          fill="#E28F83"
        />
        <path
          d="M35.222 20.9213C33.3442 18.9305 30.3049 18.9305 28.4272 20.9213L28.2787 21.0787C27.8508 21.5324 27.1521 21.5324 26.7154 21.0787C25.0822 19.3379 22.4621 18.8935 20.532 20.2639C17.9294 22.125 17.6761 25.8935 19.7809 28.125L20.7067 29.1065L26.3137 35.0509C26.9687 35.7454 28.0255 35.7454 28.6805 35.0509L34.2875 29.1065L35.2132 28.125C37.0997 26.1342 37.0997 22.912 35.222 20.9213Z"
          stroke="#FAF2DA"
          strokeWidth="2"
          fill={`${fav && '#FAF2DA'}`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
