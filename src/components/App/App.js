import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch, } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FooterEmpty from '../Footer/FooterEmpty';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';
import FleetPage from '../Fleet/FleetPage';
import FleetView from '../Fleet/FleetView';
import NewTask from '../Tasks/NewTask';
import TaskDetail from '../Tasks/TaskDetail';

import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the HomePage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={HomePage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/fleet"
              component={FleetPage}
            />
            <ProtectedRoute
              exact
              path="/fleetview"
              component={FleetView}
            />
            <ProtectedRoute
              exact
              path="/newtask"
              component={NewTask}
            />
            <ProtectedRoute
              exact
              path="/detail/:id"
              component={TaskDetail}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {this.props.user.id ? <Footer /> : <FooterEmpty />}
        </div>
      </Router>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(App);