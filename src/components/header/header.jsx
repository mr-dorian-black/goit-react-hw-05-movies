import { HeaderStyled, NavStyled, LinkStyled } from './header.styled';

const Header = () => {
  return (
    <>
      <HeaderStyled>
        <NavStyled>
          <LinkStyled to={'/'}>Home</LinkStyled>
          <LinkStyled to={'/movies'}>Movies</LinkStyled>
        </NavStyled>
      </HeaderStyled>
    </>
  );
};

export default Header;
