import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const Item = styled.li`
  display: block;
  height: 100%;
`;

export const TrendingImg = styled.img`
  object-fit: cover;
  height: 100%;
`;

export const TitleBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 10px;
  backdrop-filter: blur(15px);
  transition: all 0.2s linear;
`;

export const LinkStyled = styled(Link)`
  height: 100%;
  display: block;
  position: relative;
  overflow: hidden;

  ${TitleBlock} {
    transform: translateY(-100%);
  }

  &:hover ${TitleBlock} {
    transform: translateY(0);
  }
`;

export const Title = styled.p`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
`;
