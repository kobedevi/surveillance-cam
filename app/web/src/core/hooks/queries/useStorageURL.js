import firebase from 'firebase/app';
import { useQuery } from 'react-query';

const getStorageURL = async (path) => {
  return firebase.storage().ref(path).getDownloadURL();
};

const useStorageURL = (path) => {
  return useQuery(
    [path.split('/')[0], path],
    () => {
      return getStorageURL(path);
    },
    { staleTime: Infinity }
  );
};

export default useStorageURL;
