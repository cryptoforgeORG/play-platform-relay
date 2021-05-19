import * as React from "react";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Logout from "./pages/Logout";

function Menu() {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    async function getGreeting() {
      try {
        const res = await fetch("/api/hello");
        const greeting = await res.json();
        setGreeting(greeting);
      } catch (error) {
        console.log(error);
      }
    }

    getGreeting();
  }, []);
  return (
    <div>
      <h1 className="text-primary text-center">
        Master Relay {greeting} |{" "}
        <a href="https://www.mastersofconquest.com">Crypto Forge</a>
      </h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li> */}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

const App = (props: AppProps) => {
  return (
    <Router>
      <main className="container my-5">
        <Menu />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

interface AppProps {}

export default App;
