import firebase from 'firebase/app';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateRecording = (motionId) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, changes }) => {
      const db = firebase.firestore();
      const recordingRef = db
        .collection('camera')
        .doc(motionId)
        .collection('recordings')
        .doc(id);

      return recordingRef.update(changes);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['motionMoments', motionId]);
      },
    }
  );
};

export default useUpdateRecording;
