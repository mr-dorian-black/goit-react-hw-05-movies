import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderStyled = styled.header`
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #fff;
`;

export const NavStyled = styled.nav`
  display: flex;
  gap: 20px;
`;

export const LinkStyled = styled(NavLink)`
  text-decoration: none;
  font-size: 24px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: orange;
  }
`;
