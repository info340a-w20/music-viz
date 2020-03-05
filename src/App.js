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
          album: {cover: ""},
          preview: ""
        }
      },
      trending: [
        {
            id: 'trending'+ 0,
            cover: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: 'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752'}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: 'https://images-na.ssl-images-amazon.com/images/I/81UCBBsAXkL._SL1200_.jpg'}
            ],
            name: 'Trending 1'
        },
        {
            id: 'trending'+ 1,
            cover: "https://images-na.ssl-images-amazon.com/images/I/919WO8q-nnL._SL1500_.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: 'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752'}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: 'https://images-na.ssl-images-amazon.com/images/I/81UCBBsAXkL._SL1200_.jpg'}
            ],
            name: 'Trending 2'
        },
        {
            id:'trending'+ 2,
            cover: "https://f4.bcbits.com/img/a1266503095_10.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: 'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752'}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: 'https://images-na.ssl-images-amazon.com/images/I/81UCBBsAXkL._SL1200_.jpg'}
            ],
            name: 'Trending 3'
        },
        {
            id: 'trending'+ 3,
            cover: "https://i.pinimg.com/736x/9e/4f/b5/9e4fb5e55aaca75150fc308e8985a32c.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: 'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752'}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: 'https://images-na.ssl-images-amazon.com/images/I/81UCBBsAXkL._SL1200_.jpg'}
            ],
            name: 'Trending 4'
        }
    ],
    playlists: [
        {
            id: 0,
            cover: "https://images-na.ssl-images-amazon.com/images/I/919WO8q-nnL._SL1500_.jpg",
            songs: [
              {name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: 'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752'}, 
              {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: 'https://images-na.ssl-images-amazon.com/images/I/81UCBBsAXkL._SL1200_.jpg'}],
            name: "Time to Chill"
        }
    ],
    playlistId: 1
    }

    this.playlistElement = React.createRef();
  }

  addPlaylist = (playlist) => {
    let playlists = this.state.playlists;
    let playlistId = this.state.playlistId
    playlists.push({
      id: playlistId,
      cover: "https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/e35/76887268_171396757567282_6574615474514919914_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=110&_nc_ohc=Rj9mqlsJ7D0AX-3fxwM&oh=eb1b7369e40fad4b76d705d33c1fc85f&oe=5ECFA752",
      songs: [],
      name: ''
      
          
      });
      this.setState({
        playlists: playlists,
        playlistId: playlistId + 1
      })
      // this.showForm()
  }

  addSong = (song) => {
    // ley song = this.
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
