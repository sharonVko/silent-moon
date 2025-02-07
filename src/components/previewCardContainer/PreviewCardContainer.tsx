import { useEffect, useState } from 'react';
import { PreviewCard } from '../previewCard/PreviewCard';
import { Meditation, Yoga } from '../../pages/home/Home';
import { fetchMeditation, fetchYoga } from '../../api/fetchContent';

export const PreviewCardContainer = () => {
  const [previewCardYoga, setPreviewCardYoga] = useState<Yoga | null>(null);
  const [previewCardMeditation, setPreviewCardMeditation] = useState<Meditation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataYoga = await fetchYoga();
      const dataMeditation = await fetchMeditation();
      console.log(dataMeditation);
      if (dataYoga && dataMeditation) {
        setPreviewCardYoga(dataYoga[randomNum(dataYoga.length)]);
        setPreviewCardMeditation(dataMeditation[randomNum(dataMeditation.length)]);
      }
    };

    fetchData();
  }, []);

  const randomNum = (length: number) => {
    return Math.floor(Math.random() * length);
  };

  return (
    <>
      {' '}
      {previewCardYoga && (
        <PreviewCard
          title={previewCardYoga.title}
          level={previewCardYoga.level}
          id={previewCardYoga.id}
          video_url={previewCardYoga.video_url}
        />
      )}
      {previewCardMeditation && (
        <PreviewCard
          title={previewCardMeditation.title}
          level={previewCardMeditation.level}
          id={previewCardMeditation.id}
          image_url={previewCardMeditation.image_url}
        />
      )}
    </>
  );
};
