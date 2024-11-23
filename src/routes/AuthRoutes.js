import { lazy } from 'react';

// project importle';

import Login from '../pages/authPages/Login';
import MinimalLayout from '../layouts/MinimalLayout';
const AuthLogin = Loadable(lazy(() => import('../pages/authPages/Login')));
// const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register/Register')));
// const Feedback = Loadable(lazy(() => import('pages/authentication/Feedback/index')));
// const SSOLogin = Loadable(lazy(() => import('pages/authentication/SSO/SSOSignIn/index')));
// const GrantScreen = Loadable(lazy(() => import('pages/authentication/SSO/GrantScreen/index')));
// const ForgotPassword = Loadable(lazy(() => import('pages/authentication/ForgotPassword/ForgotPassword')));
// const ResetPassword = Loadable(lazy(() => import('pages/authentication/ResetPassword/ResetPassword')));
// const EmailConfirmation = Loadable(lazy(() => import('pages/authentication/EmailConfirmation/EmailConfirmation')));
// const BlogLanding = Loadable(lazy(() => import('pages/authentication/blogSite/BlogLanding')));
// const TermsCondition = Loadable(lazy(() => import('pages/authentication/TermsCondition/TermsCondition')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    // {
    //   path: 'signup',
    //   element: <AuthRegister />
    // },
    // {
    //   path: 'forgot-password',
    //   element: <ForgotPassword />
    // },
    // {
    //   path: 'reset-password',
    //   element: <ResetPassword />
    // },
    // {
    //   path: 'email-confirmation',
    //   element: <EmailConfirmation />
    // },
    // {
    //   path: 'support',
    //   element: <Feedback />
    // },
    // {
    //   path: 'terms',
    //   element: <TermsCondition />
    // },
    // {
    //   path: 'sso/login',
    //   element: <SSOLogin />
    // },
    // {
    //   path: 'sso/access',
    //   element: <GrantScreen />
    // },

  ]
};

export default AuthRoutes;
