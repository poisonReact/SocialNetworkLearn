import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './App.module.scss';

import Nav from './components/Nav/Nav';
import ProfileContainer from './components/Profile/ProfileContainer';




import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import { inintializeApp } from './redux/appReducer';
import Preloader from './common/Preloader/Preloader';
import store from './redux/reduxStore'
import { Provider } from 'react-redux'
import { HashRouter, BrowserRouter } from 'react-router-dom';
import { withSuspense } from './hoc/withSuspense';
import Footer from './components/Footer/Footer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
  catchAllUnhandledErrors = (promiseRejectionEvent) => {
    alert("some error occured");
    console.error(promiseRejectionEvent)
  }

  componentDidMount() {
    this.props.inintializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }


  render() {
    if (!this.props.initialized) {
      return <Preloader />
    } else {
      return (

        <div className={styles.appWrapper}>
          <HeaderContainer />

          <div className={styles.mainArea}>
            <Nav />
            <div className={styles.content}>
              <Switch>
                <Route exact path='/' render={() => <Redirect to={"/profile"} />} />
                <Route path='/Dialogs' render={withSuspense(DialogsContainer)} />
                <Route path='/Profile/:userId?' render={() => <ProfileContainer />} />
                <Route path='/Users' render={() => <UsersContainer />} />
                <Route path='/Login' render={() => <Login />} />
                <Route path='*' render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </div>
          </div>

          <Footer />
        </div>

      );
    }
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized

})

const AppContainer = compose(

  connect(mapStateToProps, { inintializeApp }),
  withRouter
)(App);

const MainApp = (props) => {

  // Use HashRouter for deploying app on github
  // Use BrowserRouter for deploying app on host
  /*<BrowserRouter basename={process.env.PUBLIC_URL}></BrowserRouter>*/
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>


}

export default MainApp
