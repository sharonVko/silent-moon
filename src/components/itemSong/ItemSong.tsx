import React from 'react';
import { PlayIcon } from '../../assets/svg/PlayIcon';
import { Link } from 'react-router-dom';

export const ItemSong = ({ id, title, duration }) => {
  return (
    <Link to={`/player/${id}`} className="flex gap-5">
      <PlayIcon />
      <div className="">
        <p className="font-semibold text-[16px]">{title}</p>
        <p className="font-semibold text-[11px]">{duration}</p>
      </div>
    </Link>
  );
};
