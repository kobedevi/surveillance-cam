import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import formatDateString from '../../../core/utils/formatDateString';
import formatTimestamp from '../../../core/utils/formatTimestamp';
import useMotionMoment from '../../../hooks/queries/useMotionMoment';
import { Alert, Spinner, Title } from '../../Design';
import Photo from '../../Shared/Photo';
import Video from '../../Shared/Video';

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
      <Link to={Routes.Timeline}>Back</Link>

      <Title>{formatDateString(motionMoment.id)}</Title>

      <dl>
        <dt>First motion</dt>
        <dd>{formatTimestamp(motionMoment.firstMotion)}</dd>
        <dt>Last motion</dt>
        <dd>{formatTimestamp(motionMoment.lastMotion)}</dd>
      </dl>

      {motionMoment.photos.map((path) => (
        <Photo key={path} path={path} />
      ))}

      {motionMoment.videos.map((path) => (
        <Video key={path} path={path} />
      ))}
    </>
  );
};

export default TimelineDetail;
