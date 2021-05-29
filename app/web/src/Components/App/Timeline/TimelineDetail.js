import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { IoMdDownload, IoMdLock, IoMdUnlock } from 'react-icons/io';
import { Routes } from '../../../core/routing';
import formatDateString from '../../../core/utils/formatDateString';
import formatTimestamp from '../../../core/utils/formatTimestamp';
import useMotionMoment from '../../../hooks/queries/useMotionMoment';
import { Alert, Button, Spinner, Title } from '../../Design';
import Video from './Video';

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

      <section className="videos">
        {motionMoment.videos.map((path, i) => (
          <article key={path}>
            <Video videoPath={path} photoPath={motionMoment.photos[i]} />
            <Button color="muted" className="lock">
              <IoMdUnlock />
            </Button>
            <Button color="secondary" className="download">
              <IoMdDownload />
            </Button>
          </article>
        ))}
      </section>
    </>
  );
};

export default TimelineDetail;
