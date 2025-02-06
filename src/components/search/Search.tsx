import React, { useEffect, useState } from 'react';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';
import { Link } from 'react-router-dom';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yogaList, setYogaList] = useState([]);
  const [meditationList, setMeditationList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setYogaList(await fetchYoga());
      setMeditationList(await fetchMeditation());
    };
    fetchData();
  }, []);

  const filteredYoga = yogaList.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredMeditation = meditationList.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative">
      {' '}
      <label className="input input-bordered flex items-center gap-2 bg-[#9da4a8] w-full mb-3 relative">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>{' '}
      </label>
      <div className="">
        {' '}
        {searchTerm && (filteredYoga.length > 0 || filteredMeditation.length > 0) && (
          <div className="bg-[#9da4a8] p-2 w-full absolute top-full left-0 mt-2 z-60">
            {filteredYoga.length > 0 && (
              <div>
                <h3 className="font-bold">Yoga</h3>
                {filteredYoga.map(yogaSingle => (
                  <Link to={`/yoga/${yogaSingle.id}`} key={yogaSingle.id}>
                    {yogaSingle.title}
                  </Link>
                ))}
              </div>
            )}

            {filteredMeditation.length > 0 && (
              <div>
                <h3 className="font-bold">Meditation</h3>
                {filteredMeditation.map(meditationSingle => (
                  <Link to={`/meditation/${meditationSingle.id}`} key={meditationSingle.id}>
                    {meditationSingle.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
