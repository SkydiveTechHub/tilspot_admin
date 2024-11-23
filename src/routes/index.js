/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes'
import MainRoutes from './MainRoutes';
import { useEffect } from 'react';
import SiteRoutes from './SiteRoutes';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = () => {
  const authToken = localStorage.getItem('token');
  if (authToken == 'null' || authToken == null) {
    return false;
  } else {
    return true;
  }
};

const PrivateRoute = () => {
  const checkValue = isAuthenticated();
  if (checkValue) {
    return [MainRoutes, SiteRoutes];
  } else {
    return [AuthRoutes];
  }
};

export default function ThemeRoutes() {
  const checkValue = isAuthenticated();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname == '/') {
      if (checkValue) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, []);
  return useRoutes(PrivateRoute());
}

// export default function ThemeRoutes() {
//   return useRoutes([MainRoutes, LoginRoutes, SiteRoutes]);
// }
