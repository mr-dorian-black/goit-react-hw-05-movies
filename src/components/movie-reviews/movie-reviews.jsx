import { useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { getMovieByIdReviews } from 'api';
import { RotatingLines } from 'react-loader-spinner';
import { LoadingContainer } from 'pages/home/home.styled';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emptyRev, setEmptyRev] = useState(false);

  const { movieId } = useParams();

  const controllerRef = useRef();
  const controllerAbort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    async function fetchMovieByIdReviews() {
      controllerAbort();

      controllerRef.current = new AbortController();

      try {
        setLoading(true);
        const response = await getMovieByIdReviews(
          movieId,
          controllerRef.current.signal
        );
        if (response.results.length === 0) {
          return setEmptyRev(true);
        }
        setReviews(response.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovieByIdReviews();
  }, [movieId]);

  return (
    <>
      {error && <div>Error! Please reload the page!</div>}
      {loading ? (
        <LoadingContainer>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </LoadingContainer>
      ) : (
        <ul>
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h3>{`Author: ${author}`}</h3>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
      {emptyRev && <p>We don't have any reviews for this movie</p>}
    </>
  );
};

export default MovieReviews;
