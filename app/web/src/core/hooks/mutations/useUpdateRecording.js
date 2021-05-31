import firebase from 'firebase/app';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateRecording = (motionId, recordingId) => {
  const queryClient = useQueryClient();

  return useMutation(
    (changes) => {
      const db = firebase.firestore();
      const recordingRef = db
        .collection('camera')
        .doc(motionId)
        .collection('recordings')
        .doc(recordingId);

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
