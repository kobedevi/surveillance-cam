import dayjs from 'dayjs';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useMotionMoments from '../../../core/hooks/queries/useMotionMoments';
import { route, Routes } from '../../../core/routing';
import formatDate from '../../../core/utils/formatDate';
import { Alert, Spinner, Title } from '../../Design';
import Photo from './Photo';

// Returns [{ day: '29 May', values: [...] }, { day: '28 May', values: [...] }]
const groupByDay = (arr) => {
  return arr.reduce((acc, obj) => {
    const dateObj = dayjs.unix(obj.firstMotion.seconds);
    const day = dateObj.startOf('day').format('D MMM');

    const lastGroup = acc[acc.length - 1];

    if (lastGroup?.day === day) {
      lastGroup.values.push(obj);
    } else {
      acc.push({ day, values: [obj] });
    }

    return acc;
  }, []);
};

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

      <section className="timeline">
        {groupByDay(motionMoments).map((group) => (
          <Fragment key={group.day}>
            <h2>{group.day}</h2>
            <div className="timeline-group">
              {group.values.map((mm) => (
                <Link className="Timeline-card" to={route(Routes.TimelineDetail, { id: mm.id })}>
                  <article key={mm.id}>
                    <Photo path={mm.preview} />
                    <p>
                      {formatDate(mm.firstMotion, 'H:mm')}&nbsp;-&nbsp;
                      {formatDate(mm.lastMotion, 'H:mm')}
                    </p>
                    <Link to={route(Routes.TimelineDetail, { id: mm.id })}>
                      View&nbsp;recordings
                    </Link>
                  </article>
                </Link>
              ))}
            </div>
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default Timeline;
