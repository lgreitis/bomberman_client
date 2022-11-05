import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BoxCenter from './components/BoxCenter';

const Container = styled.div`
  height: 300px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px #747474 solid;
  border-radius: 15px;
  background-color: #747474;
  gap: 10px;
`;

class LoginLayout extends React.Component {
  render() {
    return (
      <BoxCenter>
        <Container>
          <Outlet />
        </Container>
      </BoxCenter>
    );
  }
}

export default LoginLayout;
