import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IoMdDownload, IoMdLock, IoMdUnlock } from 'react-icons/io';
import { Routes } from '../../../core/routing';
import formatDateString from '../../../core/utils/formatDateString';
import formatTimestamp from '../../../core/utils/formatTimestamp';
import useMotionMoment from '../../../hooks/queries/useMotionMoment';
import { Alert, Button, Spinner, Title } from '../../Design';
import Video from './Video';
import useUpdateRecording from '../../../hooks/mutations/useUpdateRecording';

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
      <Link to={Routes.Timeline}>Back</Link>

      <Title>{formatDateString(motionMoment.id)}</Title>

      <dl>
        <dt>First motion</dt>
        <dd>{formatTimestamp(motionMoment.firstMotion)}</dd>
        <dt>Last motion</dt>
        <dd>{formatTimestamp(motionMoment.lastMotion)}</dd>
      </dl>

      <br />

      <section className="videos">
        {motionMoment.recordings.map((recording) => (
          <article key={recording.id}>
            <p>{formatTimestamp(recording.timeOfMotion)}</p>
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
