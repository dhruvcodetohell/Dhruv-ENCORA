import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import content from './assets/content.json'

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const RepoDetailPage = React.lazy(() => import('./pages/RepoDetailPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>{content?.titles?.loadingHome}</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/repo/:repoName',
    element: (
      <Suspense fallback={<div>{content?.titles?.repoDetailsLoading}</div>}>
        <RepoDetailPage />
      </Suspense>
    ),
  },
]);

const AppRouter: React.FC = () => <RouterProvider router={router} />;

export default AppRouter;
