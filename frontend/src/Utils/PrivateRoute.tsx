import React, {useContext, useEffect} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import UserContext from '../Contexts/UserContext';

interface Props {
  outlet: JSX.Element;
};
const PrivateRoute = (props: Props) => {
  const {setupUser, user} = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    setupUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!!user) {
    return props.outlet;
  } else {
    if (location.pathname === '/') {
      return props.outlet;
    }
    return <Navigate to={{pathname: '/'}}/>;
  }
};

export default PrivateRoute;
