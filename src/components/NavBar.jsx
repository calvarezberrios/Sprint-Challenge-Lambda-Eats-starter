import React from 'react';
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";

const Navbar = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;

    a {
        text-decoration: none;
        color: black;
    }
`;

const NavTitle = styled.h1`
    font-size: 30px;
    line-height: 1;

    span {
        color: red;
    }
`;

const NavButtons = styled.div`
    
    a {
        background: none;
        border: 1px solid red;
        font-size: 16px;
        padding: 6px 30px;
        text-decoration: none;
        color: black;

        &:first-child {
            margin-right: -1px;
        }

        &.active {
            background: red;
            color: white;
        }
    }
    
`;

const NavBar = () => {
    const { location } = useHistory();


    return (
        <Navbar>
            <Link to = "/">
                <NavTitle>Lambda <span>Eats</span></NavTitle>
            </Link>

            <NavButtons>
                <Link to = "/" className = {location.pathname === "/" ? "active" : null}>Home</Link>
                <Link to = "/help" className = {location.pathname === "/help" ? "active" : null}>Help</Link>
            </NavButtons>
        </Navbar>
    );
};

export default NavBar;