import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';

export default () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={Register} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
    </Switch>
);