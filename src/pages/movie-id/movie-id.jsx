import { Link, useLocation, useParams } from 'react-router-dom';

const MovieById = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';
  console.log(backLinkHref);

  return (
    <div>
      <Link to={backLinkHref}>Back</Link>
      <p>movieId: {movieId}</p>
    </div>
  );
};

export default MovieById;
