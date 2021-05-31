import { useState } from 'react';
import { IoMdDownload, IoMdLock, IoMdUnlock } from 'react-icons/io';
import useUpdateRecording from '../../../core/hooks/mutations/useUpdateRecording';
import formatDate from '../../../core/utils/formatDate';
import { Button } from '../../Design';
import Video from './Video';

const VideoCard = ({ recording, motionId }) => {
  const mutation = useUpdateRecording(motionId, recording.id);
  const [videoURL, setVideoURL] = useState();

  const toggleLock = (recording) => {
    mutation.mutate({ lock: !recording.lock });
  };

  return (
    <article key={recording.id}>
      <p>{formatDate(recording.timeOfMotion, 'H:mm')}</p>
      <div className="timeline"></div>
      <Video
        videoPath={recording.video}
        photoPath={recording.photo}
        setVideoURL={setVideoURL}
      />
      <Button
        color={recording.lock ? 'primary' : 'muted'}
        className="lock"
        onClick={() => toggleLock(recording)}
        disabled={mutation.isLoading}
      >
        {recording.lock ? <IoMdLock /> : <IoMdUnlock />}
      </Button>
      <Button
        color={videoURL ? 'secondary' : 'muted'}
        className="download"
        onClick={() => window.open(videoURL)}
        disabled={!videoURL}
      >
        <IoMdDownload />
      </Button>
    </article>
  );
};

export default VideoCard;
