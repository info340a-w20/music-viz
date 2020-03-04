import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './components/NavBar';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PlayListPage from './pages/PlayListPage';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './Footer';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currSong: {
        song: {
          title: "",
          artist: {name: ""},
          album: {cover: ""}
        }
      },
    }
  }

  selectSong(song) {
    this.setState({currSong: {song}})
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navigation />
        </header>
        <main className={'mb-5'}>
          <Router>
            <Switch>
              <Route path='/'>
                <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
              </Route>
              <Route path='/home'>
                <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
              </Route>
              <Route path='/playlist' component={PlayListPage} />
              {/* <Route path='/user' component={} />
              <Route path='/about' component={} /> */}
            </Switch>
        </Router>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
