import { Link, useLocation, useParams } from 'react-router-dom';
import {
  LinkStyled,
  MovieContent,
  MovieImg,
  GenresList,
  AdditionalContent,
  AdditionalList,
} from './movie-id.styled';
import { useRef, useState, useEffect } from 'react';
import { getMovieById } from 'api';
import { LoadingContainer } from 'pages/home/home.styled';
import { RotatingLines } from 'react-loader-spinner';

const MovieById = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  const controllerRef = useRef();
  const controllerAbort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    async function fetchMovieById() {
      controllerAbort();

      controllerRef.current = new AbortController();

      try {
        setLoading(true);
        const response = await getMovieById(
          movieId,
          controllerRef.current.signal
        );
        setMovie(response);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovieById();
  }, [movieId]);

  return (
    <>
      {error && <div>Error! Please reload the page!</div>}
      {loading && (
        <LoadingContainer>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </LoadingContainer>
      )}
      <LinkStyled to={backLinkHref} onClick={controllerAbort}>
        Go back
      </LinkStyled>
      {movie !== null && (
        <>
          <MovieContent>
            <MovieImg
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h2>{`${movie.title} (${new Date(
                movie.release_date
              ).getFullYear()})`}</h2>
              <p>{`User Score: ${Math.round(movie.vote_average * 10)}%`}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <GenresList>
                {movie.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </GenresList>
            </div>
          </MovieContent>
          <AdditionalContent>
            <p>Additional information</p>
            <AdditionalList>
              <li>
                <Link to="cast" state={{ from: backLinkHref }}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: backLinkHref }}>
                  Reviews
                </Link>
              </li>
            </AdditionalList>
          </AdditionalContent>
        </>
      )}
    </>
  );
};

export default MovieById;
