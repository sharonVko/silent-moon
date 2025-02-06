import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/Header';

export const Activity = () => {
  const { type } = useParams();

  return (
    <div>
      <Header />
      <h1 className="text-center text-[36px] font-black text-[#3F414E] mt-24">
        {type === 'yoga' ? 'Yoga' : 'Meditate'}
      </h1>
      <p className="mb-11 text-center text-[16px] font-semibold text-[#A0A3B1]">
        {type === 'Find your inner zen from annywhere.'
          ? 'Yoga'
          : 'Audio-only meditation techniques to help you minimize your screen time and practice on the go.'}
      </p>
    </div>
  );
};
