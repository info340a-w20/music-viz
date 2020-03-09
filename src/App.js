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
import AboutPage from './pages/AboutPage';
import firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Login from './Login'


const firebaseConfig = {
  apiKey: "AIzaSyD_QK46dNRRZMEEJbB1v8gsR-BH4di8cPQ",
  authDomain: "music-viz-340.firebaseapp.com",
  databaseURL: "https://music-viz-340.firebaseio.com",
  projectId: "music-viz-340",
  storageBucket: "music-viz-340.appspot.com",
  messagingSenderId: "499158324053",
  appId: "1:499158324053:web:5d83eab1d6e222957855dc",
  measurementId: "G-MLZ5GG8V0S"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      user:{},
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

  componentDidMount() {
    this.authListener();
  }

  addPlaylist = (playlist) => {
    let playlists = this.state.playlists;
    let playlistId = this.state.playlistId
    // console.log(playlists)

    playlists.push(playlist);
    // console.log(playlist)
    this.setState({
      playlists: playlists,
      playlistId: playlistId + 1
    })
    
    console.log(playlists)
  }

  addSong = (song, id) => {
    // console.log(playlist)
    let playlists = this.state.playlists;
    console.log(id)
    let playlist = playlists[id]
    console.log('hellll',playlist)
    playlist.songs.push(song)
  }


  selectSong(song) {
    this.setState({currSong: {song}})
  }

  authListener() {
      firebase.auth().onAuthStateChanged(
        (user) => {
          console.log(user);
          if(user) {
            this.setState({user});
            // localStorage.setItem('user', user.uid);
          } else {
            this.setState({user:null});
            // localStorage.removeItem('user')
          }
        }
      )
  }

  logout = () => {
    firebase.auth().signOut();
  }

  render() {

    if (!this.state.user) {
      return (
        <div>
          <Login />
          {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> */}
        </div>
      );
    }    

    return (
      <Router>
        <div className="App">
          <header>
            <Navigation logout={this.logout}/>
          </header>
          <main className={'mb-5'}>
              <Switch>
                <Route exact path='/'>
                  <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
                </Route>
                <Route exact path='/home'>
                  <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
                </Route>
                <Route exact path='/playlist' render={() => <PlayListPage playlistId={this.state.playlistId} ref={this.playlistElement} playlists={this.state.playlists} addPlaylist={this.addPlaylist} 
                trending={this.state.trending} />} />
                <Route path='/playlist/:playlistId' render={(renderProps) => <MyPlayList addSong={this.addSong} playlists={this.state.playlists} {...renderProps} trending={this.state.trending} />}/>
                <Route exact path='/about'>
                  <AboutPage/>
                </Route>
              </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
