import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './components/NavBar';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PlayListPage from './pages/PlayListPage';


export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
          {/* <Router>
            <Switch>
              <Route path='/home' component={} />
              <Route path='/playlist' component={} />
              <Route path='/user' component={} />
              <Route path='/about' component={} />
            </Switch>
        </Router> */}
        </header>
        <main>
          <PlayListPage />
        </main>
      </div>
    );
  }
}

export default App;
