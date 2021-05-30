import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IoMdDownload, IoMdLock, IoMdUnlock } from 'react-icons/io';
import useMotionMoment from '../../../core/hooks/queries/useMotionMoment';
import useUpdateRecording from '../../../core/hooks/mutations/useUpdateRecording';
import { Routes } from '../../../core/routing';
import formatDate from '../../../core/utils/formatDate';
import { Alert, Button, Spinner, Title } from '../../Design';
import Video from './Video';

const TimelineDetail = () => {
  const { id } = useParams();
  const { data: motionMoment, ...query } = useMotionMoment(id);
  const mutation = useUpdateRecording(id);

  const toggleLock = (recording) => {
    mutation.mutate({ id: recording.id, changes: { lock: !recording.lock } });
  };

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  return (
    <>
      <Link to={Routes.Timeline} className="return">
        Back
      </Link>

      <Title>{formatDate(motionMoment.id, 'D MMM - H:mm')}</Title>

      <p className="motion-time">
        {motionMoment.firstMotion.seconds ===
        motionMoment.lastMotion.seconds ? (
          <em>
            Motion detected at {formatDate(motionMoment.firstMotion, 'H:mm:ss')}
            .
          </em>
        ) : (
          <em>
            First motion was detected at{' '}
            {formatDate(motionMoment.firstMotion, 'H:mm:ss')}.<br />
            Last motion occured at{' '}
            {formatDate(motionMoment.lastMotion, 'H:mm:ss')}.
          </em>
        )}
      </p>

      <section className="videos">
        {motionMoment.recordings.map((recording) => (
          <article key={recording.id}>
            <p>{formatDate(recording.timeOfMotion, 'H:mm')}</p>
            <div className="timeline"></div>
            <Video videoPath={recording.video} photoPath={recording.photo} />
            <Button
              color={recording.lock ? 'primary' : 'muted'}
              className="lock"
              onClick={() => toggleLock(recording)}
              disabled={mutation.isLoading}
            >
              {recording.lock ? <IoMdLock /> : <IoMdUnlock />}
            </Button>
            <Button
              color="secondary"
              className="download"
              onClick={() => console.log('Download not implemented')}
            >
              <IoMdDownload />
            </Button>
          </article>
        ))}
      </section>
    </>
  );
};

export default TimelineDetail;
