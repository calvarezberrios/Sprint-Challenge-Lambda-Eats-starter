import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import heroImg from "../images/hero-img.jpg"

const Hero = styled.header`
    width: 100%;
    height: 400px;
    background-image: url(${heroImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left -275px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 30px;
    }
    a {
        text-decoration: none;
        color: white;
        background: red;
        font-size: 16px;
        padding: 6px 30px;
    }
`;

const Home = () => {
    return (
        <div className="home">
            <Hero>
                <h2>Your favorite food, delivered while coding</h2>
                <Link to="/pizza">Pizza?</Link>
            </Hero>
        </div>
    );
};

export default Home;