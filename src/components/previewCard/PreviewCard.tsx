import React from 'react';
import { Link } from 'react-router-dom';

interface IPreviewCardProps {
  id: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  image_url?: string;
  video_url?: string;
}

export const PreviewCard: React.FC<IPreviewCardProps> = ({ title, level, id, image_url, video_url }) => {
  return (
    <div className="rounded-2xl  h-[210px] w-[177px] overflow-hidden bg-gray-200 flex items-center justify-center relative">
      <div className="absolute w-full h-full">
        {image_url ? (
          <img src={image_url} alt={title} className="w-full h-full object-cover" />
        ) : video_url ? (
          <video src={video_url} autoPlay muted loop className="w-full h-full object-cover object-center"></video>
        ) : (
          <span className="text-gray-500 text-sm">No media available</span>
        )}
      </div>

      <div className="z-10 flex flex-col justify-around h-full p-3.5">
        <h3 className={`text-[18px] font-black ${!image_url ? 'text-[#FFECCC]' : 'text-[#4A503D]'}`}>{title}</h3>
        <p className={`text-[14px] font-semibold ${!image_url ? 'text-[#FFECCC]' : 'text-[#4A503D]'}`}>{level}</p>
        <div className="flex gap-3 items-center">
          <p className="text-[#FFECCC] ">3-10 min</p>
          <div
            className={`rounded-3xl w-[70px] h-[35px] flex items-center justify-center ${
              !image_url ? 'bg-[#FFECCC]' : 'bg-[#4A503D]'
            }`}>
            <Link className="" to={`/${video_url ? 'yoga' : 'meditation'}/${id}`}>
              START
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
