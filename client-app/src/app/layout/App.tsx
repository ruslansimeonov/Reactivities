import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import NavBar from './NavBar';

function App() {
  const location = useLocation();



  return (
    <Fragment>
      <ToastContainer position='bottom-right' theme='colored'/>
      {location.pathname === '/' ? <HomePage /> : (
        <Fragment>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </Fragment>
      )}
    </Fragment >
  );
}
export default observer(App);
