import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { Navigation } from './components/NavBar';
import { HashRouter as Router, Route, Link} from 'react-router-dom';
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
      uid: 0,
      currSong: {
        artist: "",
        cover: "",
        name: "",
        preview: ""
        // song: {
        //   title: "",
        //   artist: {name: ""},
        //   album: {cover: ""},
        //   preview: ""
        // }
      },
      
    playlists: [],
    playlistId: 0
    }
    // this.playlistRef = firebase.database().ref("playlists");
    this.userRef = firebase.database().ref('users');
    // this.playlistElement = React.createRef();
    // Create playlistRef to store the user and its playlist
  }

  componentDidMount() {
    this.authListener();
  }
  
  componentDidUpdate() {
    // check on previous state
    // only write when it's different with the new state
    // if (prevState !== this.state) {
    //   this.writeUserData();
    // }
  }



  addSong = (song, id) => {
    // console.log(playlist)
    let playlists = this.state.playlists;
    let playlist = playlists[id]
    playlist.songs.push(song)
  }


  selectSong(song) {
    this.setState({currSong: song})
  }

  selectPlaylist(id) {
    this.setState({playlistId: id})
  }

  authListener() {
      firebase.auth().onAuthStateChanged(
        (user) => {
          
          if(user) {
            this.setState({user});
            const userRef = this.userRef.child(user.uid);
            userRef.child("playlists").on("value", (snapshot) => {
              let playlists = snapshot.val() || {};
              let playlistArray = Object.keys(playlists).map((key) => {
                let playlistObj = playlists[key];
                playlistObj.id = key;
                return playlistObj;
              });
              this.setState({ playlists: playlistArray });
            })

          } else {
            this.setState({user:null});
          }
        }
      )
  }


  logout = () => {
    firebase.auth().signOut();
  }

  writeUserData = () => {
    let user = firebase.database().ref(localStorage.user)
    console.log('DATA SAVED');
  }

  render() {
    if (!this.state.user) {
      return (
        <div>
          <Login />
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
                  <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)} uid={this.state.user.uid} playlistId={this.state.playlistId} playlists={this.state.playlists} selectPlaylist={this.selectPlaylist.bind(this)}/>
                </Route>
                <Route exact path='/playlist' render={() => <PlayListPage playlistId={this.state.playlistId} ref={this.playlistElement} playlists={this.state.playlists} user={this.state.user} addPlaylist={this.addPlaylist} 
                trending={this.state.trending} save={this.save} removePlaylist={this.removePlaylist}/>} />
                <Route path='/playlist/:playlistId' render={(renderProps) => <MyPlayList addSong={this.addSong} playlists={this.state.playlists} {...renderProps} trending={this.state.trending} user={this.state.user}/>}/>
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
