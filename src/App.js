import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from "./pages/About";
import RiskMgmt from "./pages/RiskMgmt";
import Symbols from "./pages/Symbols";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <nav>
            <ul>
              <li>
                <Link to="/">Symbols</Link>
              </li>
              <li>
                <Link to="/risk">Risk Management</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div className="container">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/risk">
              <RiskMgmt />
            </Route>
            <Route path="/">
              <Symbols />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
