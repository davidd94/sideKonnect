import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-perfect-scrollbar/dist/css/styles.css';
import '../public/main.css';

import HomepageIndex from './components/homepage/homeindex';
import DashboardContainer from './components/dashboard/dashboard-container';
import store from './store';


const index = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' component={HomepageIndex} />
                <Route exact path='/dashboard' component={DashboardContainer} />
            </Switch>
        </Router>
    </Provider>
);

const app = document.getElementById('container');

ReactDOM.render(
    index, app
);