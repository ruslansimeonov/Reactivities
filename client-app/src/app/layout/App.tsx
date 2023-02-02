import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import HomePage from '../../features/home/HomePage';
import ModalContainer from '../common/modals/ModalContainer';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Loading app..." />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' theme='colored' />
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
