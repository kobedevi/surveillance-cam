import useStorageURL from '../../hooks/queries/useStorageURL';

const Video = ({ path }) => {
  const { data: URL, ...query } = useStorageURL(path);

  if (query.isLoading) {
    return null;
  }

  return (
    <video width="640" height="480" controls>
      <source src={URL} type="video/mp4" />
    </video>
  );
};

export default Video;
