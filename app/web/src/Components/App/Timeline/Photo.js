import useStorageURL from '../../../core/hooks/queries/useStorageURL';

const Photo = ({ path }) => {
  const { data: URL, ...query } = useStorageURL(path);

  if (query.isLoading) {
    return <img src="placeholder.jpg" alt="placeholder" />;
  }

  return <img src={URL} alt={path} />;
};

export default Photo;
