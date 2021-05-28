import firebase from 'firebase/app';
import { useQuery } from 'react-query';

const getMotionMoments = async () => {
  const db = firebase.firestore();
  const motionMoments = await db.collection('camera').get();

  return motionMoments.docs.map((mm) => ({ id: mm.id, ...mm.data() }));
};

const useMotionMoments = () => {
  return useQuery('motionMoments', getMotionMoments, { staleTime: 5 * 1000 });
};

export default useMotionMoments;
