import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: antiquewhite;
  text-align: center;
  padding-top: 200px;
`;

const LoginBtn = styled.button`
  width: 90px;
  height: 30px;
  border-radius: 5px;
  outline: none;
  a {
    width: 100%;
    display: block;
    height: 100%;
    line-height: 25px;
  }
`;

class Login extends Component {
  render() {
    return (
      <LoginPage>
        <h2>welcome to super market !!! </h2>
        <LoginBtn>
          <Link to="/foodlist">登录</Link>
        </LoginBtn>
      </LoginPage>
    );
  }
}

export default Login;