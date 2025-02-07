const ActivityCard = ({ img, video, title }: { img?: string; video?: string; title: string }) => {
  return (
    <>
      {' '}
      <div className="w-full h-full">
        {video ? (
          <video src={video} muted loop className="w-full h-full object-cover object-center" />
        ) : (
          <img src={img} alt={title} className="w-full h-full object-cover" />
        )}
      </div>
      <h3 className="font-bold text-[16px] text-[#FEFCF8] absolute bottom-2.5 left-2.5">{title}</h3>
    </>
  );
};

export default ActivityCard;
