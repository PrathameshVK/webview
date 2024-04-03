import { signOut } from "firebase/auth";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { auth } from "../../../firebase";
import logo from "../../assets/wv-logo.png";
import { Button } from "./Buttons";
import FlexBox from "./Flexbox";
import {
  THEME_BG_SECONDARY,
  THEME_COLOR_PRIMARY,
  THEME_COLOR_SECONDARY,
} from "./colors";

const LayoutContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Header = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  justify-content: space-between;
  gap: 2rem;
  height: fit-content;
  z-index: 1;
  position: sticky;
  top: 0;
  background-color: white;
  @media screen and (max-width: 767px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.img`
  width: 6rem;
  height: auto;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 5rem;
  }
`;

const Navbar = styled(FlexBox)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;
  @media screen and (max-width: 767px) {
    padding: 0 1rem;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 5rem;
  @media screen and (max-width: 767px) {
    position: fixed;
    gap: 1rem;
    top: 0;
    height: 100dvh;
    right: ${({ isOpen }) => (isOpen ? "-50%" : "-100%")};
    flex-direction: column;
    align-items: start;
    background-color: ${THEME_BG_SECONDARY};
    padding: 2rem;
    width: 100%;
    transition: right 0.3s ease;
  }
`;

const NavItem = styled.li`
  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${THEME_BG_SECONDARY};
  cursor: pointer;
  &:hover {
    color: ${THEME_COLOR_PRIMARY};
    text-decoration: underline;
    text-underline-offset: 0.5rem;
  }
  @media screen and (max-width: 767px) {
    color: ${THEME_COLOR_SECONDARY};
  }
`;

const HamOpenIcon = styled(FaBars)`
  display: none;
  @media screen and (max-width: 767px) {
    cursor: pointer;
    display: block;
    color: ${THEME_COLOR_PRIMARY};
    font-size: 1.5rem;
  }
`;

const HamCloseIcon = styled(FiX)`
  display: none;
  @media screen and (max-width: 767px) {
    cursor: pointer;
    display: block;
    margin-left: 35%;
    color: ${THEME_COLOR_SECONDARY};
    font-size: 1.5rem;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = auth;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutContainer>
      <Header>
        <Link to="/">
          <Logo src={logo} alt="logo" />
        </Link>
        <Navbar>
          <HamOpenIcon onClick={toggleMenu} />
          <NavMenu isOpen={isOpen}>
            <HamCloseIcon onClick={toggleMenu} />
            <NavItem>
              {currentUser && <NavLink to="/dashboard">Dashboard</NavLink>}
            </NavItem>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink to="/contact">Contact</NavLink>
            </NavItem> */}
            {!currentUser && (
              <NavItem>
                <NavLink to="/auth">Sign in</NavLink>
              </NavItem>
            )}
            {currentUser && (
              <NavItem>
                <Button onClick={handleLogout}>Log out</Button>
              </NavItem>
            )}
          </NavMenu>
        </Navbar>
      </Header>
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;
