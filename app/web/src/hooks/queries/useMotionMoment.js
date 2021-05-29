import firebase from 'firebase/app';
import { useQuery, useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();

  return useQuery(
    ['motionMoments', id],
    () => {
      return getMotionMoment(id);
    },
    {
      staleTime: 5 * 1000,
      initialData: () =>
        queryClient.getQueryData('motionMoments')?.find((mm) => mm.id === id),
    }
  );
};

export default useMotionMoment;
