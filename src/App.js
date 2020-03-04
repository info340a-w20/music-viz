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
      currSong: {
        song: {
          title: "",
          artist: {name: ""},
          album: {cover: ""}
        }
      },
      trending: [
        {
            id: 'trending'+ 0,
            cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: ''}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: ''}
            ],
            name: 'Trending 1'
        },
        {
            id: 'trending'+ 1,
            cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: ''}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: ''}
            ],
            name: 'Trending 2'
        },
        {
            id:'trending'+ 2,
            cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: ''}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: ''}
            ],
            name: 'Trending 3'
        },
        {
            id: 'trending'+ 3,
            cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: ''}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: ''}
            ],
            name: 'Trending 4'
        }
    ],
    playlists: [
        {
            id: 0,
            cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: ''}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: ''}],
            name: "Time to Chill"
        }
    ]
    }

    this.playlistElement = React.createRef();
  }

  addPlaylist = (playlist) => {
    let playlists = this.state.playlists;
    playlists.push({
      id: 1,
      cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
      songs: [],
      name: ''
      
          
      });
      this.setState({
        playlists: playlists
      })
      // this.showForm()
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

              <Route exact path='/'>
                <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
              </Route>
              <Route exact path='/home'>
                <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
              </Route>
              <Route exact path='/playlist' render={() => <PlayListPage ref={this.playlistElement} playlists={this.state.playlists} addPlaylist={this.addPlaylist} 
              trending={this.state.trending} />} />
              <Route path='/playlist/:playlistId' render={(renderProps) => <MyPlayList playlists={this.state.playlists} {...renderProps} trending={this.state.trending} />}/>
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
