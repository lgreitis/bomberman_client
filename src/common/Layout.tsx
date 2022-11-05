import { css } from '@emotion/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

class Layout extends React.Component {
  render() {
    return (
      <div
        css={css`
          height: 100vh;
          width: 100%;
        `}>
        <Outlet />
      </div>
    );
  }
}

export default Layout;
