import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './components/NavBar';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PlayListPage from './pages/PlayListPage';
import { HomePage } from './pages/HomePage/HomePage';


export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
          <Router>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route path='/playlist' component={PlayListPage} />
              {/* <Route path='/user' component={} />
              <Route path='/about' component={} /> */}
            </Switch>
        </Router>
        </header>
        <main>
          {/* <PlayListPage /> */}
        </main>
      </div>
    );
  }
}

export default App;
