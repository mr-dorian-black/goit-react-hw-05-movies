import { searchMovie } from 'api';
import { MoviesList } from 'components/movies-list/movies-list';
import { LoadingContainer } from 'pages/home/home.styled';
import { useEffect, useRef, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';
import { SearchButton, SearchInput, FormStyled } from './movies.styled';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef();
  const controllerAbort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchSearchMovie() {
      controllerAbort();

      controllerRef.current = new AbortController();

      try {
        setLoading(true);
        const response = await searchMovie(query, controllerRef.current.signal);
        setMovies(response.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSearchMovie();
  }, [query]);

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.elements.query.value;
    const nextParams = searchValue !== '' ? { query: searchValue } : {};
    setSearchParams(nextParams);
    form.reset();
  };

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
      <div>
        <FormStyled onSubmit={onSubmit}>
          <SearchInput type="text" name="query" defaultValue={query} />
          <SearchButton type="submit">Search</SearchButton>
        </FormStyled>
        <MoviesList list={movies} />
      </div>
    </>
  );
};

export default Movies;
