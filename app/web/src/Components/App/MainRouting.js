import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../core/routing';
import Home from './Home/Home';
import Timeline from './Timeline/Timeline';
import TimelineDetail from './Timeline/TimelineDetail';
import Settings from './Settings/Settings';

const MainRouting = () => {
  return (
    <Switch>
      <Route exact path={Routes.Home}>
        <Home />
      </Route>
      <Route exact path={Routes.Timeline}>
        <Timeline />
      </Route>
      <Route exact path={Routes.TimelineDetail}>
        <TimelineDetail />
      </Route>
      <Route exact path={Routes.Settings}>
        <Settings />
      </Route>
      <Redirect to={Routes.Home} />
    </Switch>
  );
};

export default MainRouting;
