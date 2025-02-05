import supabase from '../utils/supabase';

export const fetchYoga = async () => {
  const { data: yogaData, error } = await supabase.from('yoga').select();

  if (error) {
    console.error('Ошибка при загрузке данных:', error);
    return;
  }

  if (!yogaData || yogaData.length === 0) {
    console.warn('Нет данных в таблице meditation');
    return;
  }

  return yogaData;
};

export const fetchMeditation = async () => {
  const { data: meditationData, error } = await supabase.from('meditation').select();

  if (error) {
    console.error('Ошибка при загрузке данных:', error);
    return;
  }

  if (!meditationData || meditationData.length === 0) {
    console.warn('Нет данных в таблице meditation');
    return;
  }

  return meditationData;
};
