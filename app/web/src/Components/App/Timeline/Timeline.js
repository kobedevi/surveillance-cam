import { Link } from 'react-router-dom';
import useMotionMoments from '../../../core/hooks/queries/useMotionMoments';
import { route, Routes } from '../../../core/routing';
import formatDate from '../../../core/utils/formatDate';
import { Alert, Spinner, Title } from '../../Design';
import Photo from './Photo';

const Timeline = () => {
  const { data: motionMoments, ...query } = useMotionMoments();

  if (query.isLoading) {
    return <Spinner />;
  }

  if (query.isError) {
    return <Alert color="danger">{query.error.message}</Alert>;
  }

  return (
    <>
      <Title>Timeline</Title>

      <ul>
        {motionMoments.map((mm) => (
          <li key={mm.id}>
            <Photo path={mm.preview} />
            <Link to={route(Routes.TimelineDetail, { id: mm.id })}>
              {formatDate(mm.id, 'D MMM - H:mm')}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Timeline;
