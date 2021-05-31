import firebase from 'firebase/app';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateSettings = (motionId) => {
  const queryClient = useQueryClient();

  return useMutation(
    (changes) => {
      const db = firebase.firestore();
      const settingsRef = db.collection('app').doc('settings');

      return settingsRef.update(changes);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      },
    }
  );
};

export default useUpdateSettings;
