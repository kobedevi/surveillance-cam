import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Routes } from '../../../core/routing';
import useMotionMoment from '../../../hooks/queries/useMotionMoment';
import Alert from '../../Design/Alert';
import Spinner from '../../Design/Spinner/Spinner';

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

      <h1>TimelineDetail {motionMoment.id}</h1>

      <dl>
        {Object.entries(motionMoment).map(([key, value]) => (
          <>
            <dt>{key}</dt>
            <dd>{value.toString()}</dd>
          </>
        ))}
      </dl>
    </>
  );
};

export default TimelineDetail;
