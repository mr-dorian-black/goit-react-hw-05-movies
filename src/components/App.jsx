import Header from './header/header';
import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { MainStyled } from './GlobalStyled';

const HomePage = lazy(() => import('pages/home/home'));
const MovieById = lazy(() => import('pages/movie-id/movie-id'));
const MovieCast = lazy(() => import('components/movie-cast/movie-cast'));
const MovieReviews = lazy(() =>
  import('components/movie-reviews/movie-reviews')
);
const Movies = lazy(() => import('pages/movies/movies'));

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
          <Route path="movies" element={<Movies />} />
          <Route
            path="movies/:movieId"
            element={
              <>
                <MovieById />
                <Outlet />
              </>
            }
          >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
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
