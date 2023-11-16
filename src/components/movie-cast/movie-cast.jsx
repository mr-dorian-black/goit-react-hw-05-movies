import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { getMovieByIdCast } from 'api';
import { RotatingLines } from 'react-loader-spinner';
import { LoadingContainer } from 'pages/home/home.styled';
import { ActorList, ActorItem, ActorImg } from './movie-cast.styled';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  const controllerRef = useRef();
  const controllerAbort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    async function fetchMovieByIdCast() {
      controllerAbort();

      controllerRef.current = new AbortController();

      try {
        setLoading(true);
        const response = await getMovieByIdCast(
          movieId,
          controllerRef.current.signal
        );
        setCast(response.cast);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovieByIdCast();

    return () => controllerAbort();
  }, [movieId]);

  const unknownImg =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg';

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
      <ActorList>
        {cast.map(({ id, character, name, profile_path }) => {
          return (
            <ActorItem key={id}>
              <ActorImg
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : unknownImg
                }
                alt={name}
              />
              <p>{name}</p>
              <p>{character}</p>
            </ActorItem>
          );
        })}
      </ActorList>
    </>
  );
};

export default MovieCast;
