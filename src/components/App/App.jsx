import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Campaign from '../Campaign/Campaign';
import Battle from '../Battle/Battle';
import Shop from '../Shop/Shop';
import Characters from '../Characters/Characters';
import Inventory from '../Inventory/Inventory';
import SecretCampaign from '../SecretCampaign/SecretCampaign';
import EndingCredits from '../EndingCredits/EndingCredits';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.userReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>

      <div className="d-flex flex-column justify-content-center w-100 h-100"></div>
        
        {/* <Nav /> */}

        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the HomePage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows HomePage else shows LoginPage
            exact
            path="/home"
          >
            <HomePage />
          </ProtectedRoute>




          <ProtectedRoute exact path="/shop">
            <Shop />
          </ProtectedRoute>

          <ProtectedRoute exact path="/inventory">
            <Inventory />
          </ProtectedRoute>

          <ProtectedRoute exact path="/characters">
            <Characters />
          </ProtectedRoute>

          <ProtectedRoute exact path="/battle/:id">
            <Battle />
          </ProtectedRoute>

          <ProtectedRoute exact path="/campaign">
            <Campaign />
          </ProtectedRoute>

          <ProtectedRoute exact path="/secretCampaign">
            <SecretCampaign />
          </ProtectedRoute>

          <ProtectedRoute exact path="/credits">
            <EndingCredits />
          </ProtectedRoute>






          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/home" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
