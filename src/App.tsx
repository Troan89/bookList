import React, {useEffect} from 'react';
import './App.css';
import styled from "styled-components";
import {NavLink, Outlet, useNavigate} from "react-router-dom";

function App() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/books');
    }, []);

    return (
        <WrapperApp>
            <NavBar>
                <NavLink to={'/books'}>список книг</NavLink>
                <NavLink to={'/authors'}>список авторов</NavLink>
            </NavBar>
            <Content><Outlet /></Content>
        </WrapperApp>
    );
}

export default App;

const WrapperApp = styled.div`
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    gap: 5px

`

const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 200px;
    background-color: #61dafb;
`

const Content = styled.main`
    width: 800px;
    background-color: bisque;
`
