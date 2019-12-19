import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import About from '../pages/About';
import Leads from '../components/leads';
import Dashboard from '../pages/Dashboard';


export default function Routes() {
    return (
<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/leads"> New Lead</Link>
            </li>
            <li>
                <Link to="/Dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/leads">
            <Leads />
          </Route>
          <Route path="/Dashboard"> 
             <Dashboard /> 
          </Route>
        </Switch>
      </div>
    </Router>
    );
}