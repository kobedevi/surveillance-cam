import firebase from 'firebase/app';
import { useQuery } from 'react-query';

const getSettings = async () => {
  const db = firebase.firestore();
  const settings = await db.collection('app').doc('settings').get();
  return settings.data();
};

const useSettings = () => {
  return useQuery('settings', getSettings, { staleTime: 5 * 1000 });
};

export default useSettings;
