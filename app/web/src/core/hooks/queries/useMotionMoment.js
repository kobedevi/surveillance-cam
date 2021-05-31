import firebase from 'firebase/app';
import { useQuery } from 'react-query';

const getMotionMoment = async (id) => {
  const db = firebase.firestore();
  const motionMoment = await db.collection('camera').doc(id).get();

  if (!motionMoment.exists) {
    throw new Error('Invalid id');
  }

  const recordings = await db
    .collection('camera')
    .doc(id)
    .collection('recordings')
    .get();

  return {
    id: motionMoment.id,
    ...motionMoment.data(),
    recordings: recordings.docs.map((r) => ({ id: r.id, ...r.data() })),
  };
};

const useMotionMoment = (id) => {
  return useQuery(
    ['motionMoments', id],
    () => {
      return getMotionMoment(id);
    },
    {
      staleTime: 5 * 1000,
    }
  );
};

export default useMotionMoment;
