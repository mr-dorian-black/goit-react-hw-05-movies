import Header from './header/header';
import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { MainStyled } from './GlobalStyled';

const HomePage = lazy(() => import('pages/home/home'));
const MovieById = lazy(() => import('pages/movie-id/movie-id'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <MainStyled>
                <Outlet />
              </MainStyled>
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="movies" element={<div>movies</div>} />
          <Route
            path="movies/:movieId"
            element={
              <>
                <MovieById />
                <Outlet />
              </>
            }
          >
            <Route path="cast" element={<div>movieId cast</div>} />
            <Route path="reviews" element={<div>movieId reviews</div>} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <div>
              <h2>Page not found</h2>
              <p>
                Back to <Link to="/">Home</Link>
              </p>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};
