import useStorageURL from '../../../core/hooks/queries/useStorageURL';

const Photo = ({ path }) => {
  const { data: URL, ...query } = useStorageURL(path);

  if (query.isLoading) {
    return null;
  }

  return <img src={URL} alt={path} />;
};

export default Photo;
