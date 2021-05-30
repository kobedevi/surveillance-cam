import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useMotionMoment from '../../../core/hooks/queries/useMotionMoment';
import { Routes } from '../../../core/routing';
import formatDate from '../../../core/utils/formatDate';
import { Alert, Spinner, Title } from '../../Design';
import VideoCard from './VideoCard';

const TimelineDetail = () => {
  const { id } = useParams();
  const { data: motionMoment, ...query } = useMotionMoment(id);

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
          <VideoCard
            key={recording.id}
            recording={recording}
            motionId={motionMoment.id}
          />
        ))}
      </section>
    </>
  );
};

export default TimelineDetail;
