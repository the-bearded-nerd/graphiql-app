import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import * as Pages from '../pages';

const routes = [
  {
    path: '/',
    element: <Pages.GreetingPage />,
    private: false,
  },
  {
    path: '/main',
    element: <Pages.MainPage />,
    private: true,
  },
  {
    path: '/auth',
    element: <Pages.AuthPage />,
    private: true,
  },
  {
    path: '*',
    element: <Pages.NotFoundPage />,
    private: false,
  },
];

export default function AppRouter() {
  const [user] = useAuthState(auth);
  return (
    <Routes>
      {routes.map((route, index) =>
        route.private ? (
          <Route
            key={index}
            path={route.path}
            element={
              user ? route.element : <Navigate to="/auth" replace={true} />
            }
          />
        ) : (
          <Route key={index} path={route.path} element={route.element} />
        )
      )}
    </Routes>
  );
}
