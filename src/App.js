import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';

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

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.inintializeApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    } else {
      return (

        <div className="App-wrapper">
          <HeaderContainer />
          <Nav />
          <div className="App-wrapper-content">
            <Route path='/Dialogs' render={ withSuspense(DialogsContainer)} />
            <Route path='/Profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/Users' render={() => <UsersContainer />} />
            <Route path='/Login' render={() => <Login />} />
          </div>
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
  /*<BrowserRouter></BrowserRouter>*/
return <HashRouter  basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter >


}

export default MainApp
