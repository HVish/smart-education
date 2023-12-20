import { useDispatch } from 'react-redux';
import { lazy, Suspense, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import TutorLayout from 'src/layouts/tutor';
import LearnerLayout from 'src/layouts/learner';
import { fetchProfile } from 'src/app/auth/auth.action';

import { ProtectedRoute } from './components';

export const IndexPage = lazy(() => import('src/pages/app'));
export const MyCoursesPage = lazy(() => import('src/pages/my-courses'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignupPage = lazy(() => import('src/pages/signup'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const routes = useRoutes([
    {
      path: '/tutor',
      element: (
        <ProtectedRoute>
          <TutorLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </TutorLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'my-courses', element: <MyCoursesPage /> },
      ],
    },
    {
      path: '/learner',
      element: (
        <ProtectedRoute>
          <LearnerLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </LearnerLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'my-courses', element: <MyCoursesPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
