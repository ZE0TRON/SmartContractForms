import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router";
import EmailForm from "./components/form";
import IntegrationPage from "./components/integration";
import TopNavbar from "./components/TopNavbar";
import { LoginScreen } from "./components/login";
function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Switch>
        <Route path="/integration" component={IntegrationPage} />
        <Route path="/form" component={EmailForm} />
        <Route path="/login" component={LoginScreen} />
        <Redirect to="/form" />
        <IntegrationPage />
      </Switch>
    </div>
  );
}

export default App;
