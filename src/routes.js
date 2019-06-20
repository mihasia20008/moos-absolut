import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withKeycloak } from 'react-keycloak';

import LayoutBase from './containers/Layout';
import LoginBase from './pages/Login';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';

export default ({ useKeycloak }) => {
  const Login = useKeycloak ? withKeycloak(LoginBase) : LoginBase;
  const Layout = useKeycloak ? withKeycloak(LayoutBase) : LayoutBase;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Layout path="/tasks/:id" component={Tasks} />
        <Layout path="/tasks" component={Tasks} />
        <Layout component={NotFound} />
      </Switch>
    </Router>
  );
};
