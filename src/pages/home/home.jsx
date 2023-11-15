import { useEffect, useRef, useState } from 'react';
import { getTrending } from 'api';
import { TrendingList } from 'components/trendings-list/trendings-list';
import { RotatingLines } from 'react-loader-spinner';
import { LoadingContainer } from './home.styled';

const HomePage = () => {
  const [trendings, setTrendings] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef();

  useEffect(() => {
    async function fetchTrending() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();

      try {
        setLoading(true);
        const response = await getTrending(controllerRef.current.signal);
        setTrendings(response.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return error ? (
    <div>Error! Please reload the page!</div>
  ) : (
    <>
      <h2>Tranding today</h2>
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
      <TrendingList list={trendings} />
    </>
  );
};

export default HomePage;
