import { useLocation } from 'react-router-dom';
import {
  List,
  Item,
  TrendingImg,
  LinkStyled,
  TitleBlock,
  Title,
} from './trendings-list.styled';

export const TrendingList = ({ list }) => {
  const location = useLocation();
  return (
    <List>
      {list.map(({ original_title, name, id, poster_path }) => {
        return (
          <Item key={id}>
            <LinkStyled to={`/movies/${id}`} state={{ from: location }}>
              <TrendingImg
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt=""
              />
              <TitleBlock>
                <Title>{original_title || name}</Title>
              </TitleBlock>
            </LinkStyled>
          </Item>
        );
      })}
    </List>
  );
};
