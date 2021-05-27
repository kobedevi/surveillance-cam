import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from '../../core/routing';
import Home from './pages/Home';
import Timeline from './pages/Timeline/Timeline';
import Settings from './pages/Settings';

const MainRouting = () => {   
    
    return (
        <Switch>
            <Route path={Routes.Home}>
                <Home/>
            </Route>
            <Route path={Routes.Timeline}>
                <Timeline />
            </Route>
            <Route path={Routes.Settings}>
                <Settings/>
            </Route>
            <Redirect to={Routes.Home} />
        </Switch>
    );
};

export default MainRouting;
