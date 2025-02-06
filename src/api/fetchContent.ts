import supabase from '../utils/supabase';

export const fetchYoga = async () => {
  const { data: yogaData, error } = await supabase.from('yoga').select();

  if (error) {
    console.error('Fehler fetch data', error);
    return;
  }

  if (!yogaData || yogaData.length === 0) {
    console.warn('Not data in meditation');
    return;
  }

  return yogaData;
};

export const fetchMeditation = async () => {
  const { data: meditationData, error } = await supabase.from('meditation').select();

  if (error) {
    console.error('Fehler fetch data', error);
    return;
  }

  if (!meditationData || meditationData.length === 0) {
    console.warn('Not data in  meditation');
    return;
  }

  return meditationData;
};

export const fetchFavYoga = async () => {
  const { data: userSession } = await supabase.auth.getSession();
  const userId = userSession.session?.user.id;

  if (!userId) {
    console.error('Benutzer nicht eingeloggt');
    return [];
  }

  const { data: favorites, error } = await supabase
    .from('user_favorites_yoga') // Tabelle mit den Favoriten
    .select('item_id') // Nur die IDs der gespeicherten Einträge abrufen
    .eq('user_id', userId);

  if (error) {
    console.error('Fehler beim Abrufen der Favoriten:', error);
    return [];
  }

  if (!favorites || favorites.length === 0) {
    console.warn('Keine Yoga-Favoriten vorhanden');
    return [];
  }

  const favIds = favorites.map(fav => fav.item_id); // Alle Favoriten-IDs sammeln

  const { data: yogaData, error: yogaError } = await supabase
    .from('yoga') // Haupttabelle mit Yoga-Einträgen
    .select('*')
    .in('id', favIds); // Filtern nach den gespeicherten Favoriten-IDs

  if (yogaError) {
    console.error('Fehler beim Abrufen der Yoga-Daten:', yogaError);
    return [];
  }

  return yogaData;
};

export const fetchFavMeditation = async () => {
  const { data: userSession } = await supabase.auth.getSession();
  const userId = userSession.session?.user.id;

  if (!userId) {
    console.error('Benutzer nicht eingeloggt');
    return [];
  }

  const { data: favorites, error } = await supabase
    .from('user_favorites_meditation') // Tabelle mit den Favoriten für Meditation
    .select('item_id') // Nur die IDs der gespeicherten Einträge abrufen
    .eq('user_id', userId);

  if (error) {
    console.error('Fehler beim Abrufen der Meditation-Favoriten:', error);
    return [];
  }

  if (!favorites || favorites.length === 0) {
    console.warn('Keine Meditation-Favoriten vorhanden');
    return [];
  }

  const favIds = favorites.map(fav => fav.item_id); // Alle Favoriten-IDs sammeln

  const { data: meditationData, error: meditationError } = await supabase
    .from('meditation') // Haupttabelle mit Meditation-Einträgen
    .select('*')
    .in('id', favIds); // Filtern nach den gespeicherten Favoriten-IDs

  if (meditationError) {
    console.error('Fehler beim Abrufen der Meditation-Daten:', meditationError);
    return [];
  }

  return meditationData;
};

export const fetchWithCategory = async (activity, categoryId) => {
  if (!activity || !categoryId) {
    console.error('Fehlende Parameter: activity oder categoryId');
    return [];
  }

  const { data, error } = await supabase.from(activity).select('*').eq('category_id', categoryId);

  if (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return [];
  }

  return data || [];
};
