import { config } from "src/helpers/config";
import axios from "axios";

function mount(app) {
  const jwt = getJwt();
  if (!jwt) {
    app.setState({
      authenticated: false,
    });
    return;
  }

  axios
    .get(config.apiUrl + "/api/user", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      app.setState({
        user: res.data,
        authenticated: true,
      });
    })
    .catch((err) => {
      app.setState({
        authenticated: false,
        user: undefined,
      });
      localStorage.removeItem("sharenotes-jwt");
      console.log("Error in authentication");
      console.log(err);
    });
}

function getJwt() {
  return localStorage.getItem("sharenotes-jwt");
}

function login(app, email, password) {
  axios
    .post(config.apiUrl + "/api/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      localStorage.setItem("sharenotes-jwt", res.data.access_token);
      app.setState({ authenticated: true, user: res.data.user });
    });
}

function logout(app) {
  console.log("Loggin out!");
  localStorage.removeItem("sharenotes-jwt");
  app.setState({
    authenticated: false,
    user: undefined,
  });
}

function isAuthenticated(app) {
  return app.state.authenticated;
}

export { mount, getJwt, login, logout, isAuthenticated };
