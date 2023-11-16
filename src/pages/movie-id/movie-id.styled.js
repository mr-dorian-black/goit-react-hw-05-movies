import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkStyled = styled(Link)`
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 1px 10px;
  background-color: #fff;
  transition: all 0.2s linear;
  font-size: 18px;
  margin-bottom: 40px;
  display: inline-block;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const MovieContent = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

export const MovieImg = styled.img`
  max-width: 300px;
`;

export const GenresList = styled.ul`
  list-style: none;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  padding: 0;
  font-weight: 500;
`;

export const AdditionalContent = styled.div`
  padding: 10px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
`;

export const AdditionalList = styled.ul`
  list-style: none;
  padding: 0;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
