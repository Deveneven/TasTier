import React from 'react';
import {Navigate} from 'react-router-dom';

interface Props {
  outlet: JSX.Element;
};
const PrivateRoute = (props: Props) => {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return props.outlet;
  } else {
    return <Navigate to={{pathname: '/'}}/>;
  }
};

export default PrivateRoute;
