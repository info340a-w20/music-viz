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
import MyPlayList from './pages/MyPlayList';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: [
        {
            id: 0,
            src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
                
            ]
        },
        {
            id: 1,
            src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
                
            ]
        },
        {
            id: 2,
            src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
                
            ]
        },
        {
            id: 3,
            src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
                
            ]
        }
    ],
    playlists: [
        {
            id: 0,
            cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
                
            ]
        }
    ]
    }
  }

  addPlaylist = (playlist) => {
    let playlists = this.state.playlists;
    playlists.push({
      id: 1,
      cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
      songs: [
          
      ]
  });
  this.setState({
    playlists: playlists
  })
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
              <Route path='/home' component={HomePage} />
              <Route exact path='/playlist' render={() => <PlayListPage playlists={this.state.playlists} addPlaylist={this.addPlaylist} trending={this.state.trending} />} />
              <Route path='/playlist/:playlistId' render={(renderProps) => <MyPlayList playlists={this.state.playlists} {...renderProps} />}/>
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
