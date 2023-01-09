import React from 'react';
import {Navigate} from 'react-router-dom';

interface Props {
  outlet: JSX.Element;
};
const PrivateRoute = (props: Props) => {
  // tu sparwdzenie czy jestesmy zalogowani
  const isAuthenticated = true;
  if (isAuthenticated) {
    return props.outlet;
  } else {
    return <Navigate to={{pathname: '/'}}/>;
  }
};

export default PrivateRoute;
