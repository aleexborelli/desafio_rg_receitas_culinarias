import React from 'react';

import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import NewTransaction from '../pages/NewTransaction';
import Config from '../pages/Config';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { usuario } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return usuario ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        );
      }}
    />
  );
};

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/sign-up" component={SignUp} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/nova-receita" component={NewTransaction} />
    <PrivateRoute path="/config" component={Config} />
    <Redirect from="*" to="/dashboard" />
  </Switch>
);

export default Routes;
