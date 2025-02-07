import { Meditation, Yoga } from '../../pages/home/Home';
import { Link } from 'react-router-dom';

export const ArticleCard = ({ yogaSingle, meditationSingle }: { yogaSingle?: Yoga; meditationSingle?: Meditation }) => {
  return (
    <div className="rounded-2xl w-[162px] overflow-hidden">
      <Link to={`/${yogaSingle ? 'yoga' : 'meditation'}/${yogaSingle?.id || meditationSingle?.id}`}>
        <div className="w-[162px] h-[113px]">
          {yogaSingle ? (
            <video src={yogaSingle.video_url} muted loop className="w-full h-full object-cover object-center" />
          ) : (
            <img
              src={meditationSingle?.image_url}
              alt={meditationSingle?.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h3 className="p-1 text-[#4A503D] font-black text-[18px] whitespace-nowrap overflow-hidden overflow-ellipsis">
          {yogaSingle?.title || meditationSingle?.title}
        </h3>
        <div className="p-1 text-[#A1A4B2] font-semibold text-[11px] flex justify-between">
          <p className="">{yogaSingle?.level || meditationSingle?.level}</p>
          <p>3-10min</p>
        </div>
      </Link>
    </div>
  );
};
