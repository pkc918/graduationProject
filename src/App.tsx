import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import './App.css';
import { FrontendAuth } from './components/FrontendAuth';
import { routerConfig } from './router/RouterTable';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <FrontendAuth config={routerConfig} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
