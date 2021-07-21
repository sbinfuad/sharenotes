import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "src/components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import Login from "src/components/Login";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import { mount, login, logout } from "src/helpers/auth";
import Dashboard from "src/components/Dashboard";
import "src/assets/css/App.css";
import Courseform from "src/components/Courseform";

function SecuredRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function UnauthenticatedRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: undefined,
      user: undefined,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.loginAfterRegistered = this.loginAfterRegistered.bind(this);
  }

  login(email, password) {
    login(this, email, password);
  }

  loginAfterRegistered(token, user) {
    localStorage.setItem("sharenotes-jwt", token);
    this.setState({ authenticated: true, user: user });
  }

  logout() {
    logout(this);
  }

  isAuthenticated() {
    return this.state.authenticated;
  }

  componentDidMount() {
    mount(this);
  }

  render() {
    //console.log(this.state);
    if (this.isAuthenticated() === undefined) {
      return <Loading />;
    }
    return (
      <>
        <div className="App">
          <Header appState={this.state} logout={this.logout} />
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Home appState={this.state} />}
            />
            <UnauthenticatedRoute
              path="/register"
              exact
              component={Register}
              authenticated={this.isAuthenticated()}
              loginAfterRegistered={this.loginAfterRegistered}
            />
            <Route
              path="/user/:username"
              exact
              component={(props) => (
                <Profile
                  appState={this.state}
                  {...props}
                  authenticated={this.isAuthenticated()}
                />
              )}
            />
            <SecuredRoute
              path="/user/:username/edit"
              exact
              authenticated={this.isAuthenticated()}
              component={(props) => (
                <ProfileEdit appState={this.state} {...props} />
              )}
            />
            <SecuredRoute
              path="/user/:username/dashboard"
              exact
              authenticated={this.isAuthenticated()}
              component={() => <Dashboard appState={this.state} />}
            />

            <SecuredRoute
              path="/user/:username/addcourse"
              exact
              authenticated={this.isAuthenticated()}
              component={() => <Courseform appState={this.state} />}
            />

            <UnauthenticatedRoute
              path="/login"
              exact
              authenticated={this.isAuthenticated()}
              component={() => (
                <Login
                  appState={this.state}
                  loginAfterRegistered={this.loginAfterRegistered}
                  login={this.login}
                />
              )}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default withRouter(App);
