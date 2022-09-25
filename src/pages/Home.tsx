import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import BoxCenter from "../common/components/BoxCenter";

const Button = styled(Link)`
  border: 1px #000 solid;
  border-radius: 5px;
  padding: 5px;
  color: #ffffff;
  background-color: #000;
  text-decoration: none; /* no underline */
`;

const Container = styled(BoxCenter)`
  gap: 10px;
`;

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Button to="/login">Login</Button>
        <Button to="/register">Register</Button>
      </Container>
    );
  }
}

export default Home;
