import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import BoxCenter from "../common/components/BoxCenter";

const Container = styled(BoxCenter)`
  gap: 10px;
`;

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Link css={Button} to="/login">
          Login
        </Link>
        <Link css={Button} to="/register">
          Register
        </Link>
      </Container>
    );
  }
}

export default Home;
