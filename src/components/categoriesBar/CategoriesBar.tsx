import React from 'react';
import { useParams } from 'react-router-dom';

export const CategoriesBar = () => {
  const { type } = useParams();

  return <div>Categories</div>;
};
