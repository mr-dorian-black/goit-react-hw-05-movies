import { useLocation } from 'react-router-dom';
import {
  List,
  Item,
  TrendingImg,
  LinkStyled,
  TitleBlock,
  Title,
} from './movies-list.styled';

export const MoviesList = ({ list }) => {
  const location = useLocation();
  return (
    <List>
      {list.map(({ title, name, id, poster_path }) => {
        return (
          <Item key={id}>
            <LinkStyled to={`/movies/${id}`} state={{ from: location }}>
              <TrendingImg
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://www.si.edu/sites/default/files/newsdesk/press_releases/clip_art_film.jpeg'
                }
                alt=""
              />
              <TitleBlock>
                <Title>{title || name}</Title>
              </TitleBlock>
            </LinkStyled>
          </Item>
        );
      })}
    </List>
  );
};
