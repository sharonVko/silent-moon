/* import { PlayIcon } from '../../assets/svg/PlayIcon';
import { Link } from 'react-router-dom';

export const ItemSong = ({ id, title, duration }: { id: number; title: string; duration: string }) => {
  return (
    <Link to={`/player/${id}`} className="flex gap-5 py-2">
      <PlayIcon />
      <div className="">
        <p className="font-semibold text-[16px]">{title}</p>
        <p className="font-semibold text-[11px]">{duration}</p>
      </div>
      <hr className="border-t border-gray-300 my-2 grey"/>
    </Link>
  );
};
 */

import { PlayIcon } from '../../assets/svg/PlayIcon';
import { Link } from 'react-router-dom';

export const ItemSong = ({ id, title, duration }: { id: number; title: string; duration: string }) => {
  return (
    <article className='pr-7'>
    <Link to={`/player/${id}`} className="flex gap-5 py-3">
      <PlayIcon />
      <div className="">
        <p className="font-semibold text-[16px]">{title}</p>
        <p className="font-semibold text-[11px]">{duration}</p>
      </div>
    </Link>
      <hr className="border-t border-gray-100 my-2"/>
    </article>
  );
};
