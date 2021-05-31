import { useEffect } from 'react';
import useStorageURL from '../../../core/hooks/queries/useStorageURL';

const Video = ({ videoPath, photoPath, setVideoURL }) => {
  const { data: videoURL, ...videoQuery } = useStorageURL(videoPath);
  const { data: photoURL, ...photoQuery } = useStorageURL(photoPath);

  useEffect(() => {
    setVideoURL(videoURL);
  }, [setVideoURL, videoURL]);

  if (videoQuery.isLoading && photoQuery.isLoading) {
    return <video className="placeholder" width="640" controls></video>;
  }

  return (
    <video preload="none" poster={photoURL} width="640" controls>
      {videoURL && <source src={videoURL} type="video/mp4" />}
    </video>
  );
};

export default Video;
