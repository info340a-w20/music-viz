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
      currSong: {
        song: {
          title: "",
          artist: {name: ""},
          album: {cover: ""},
          preview: ""
        }
      },
  
    playlists: [
        {
            id: 0,
            cover: "https://images-na.ssl-images-amazon.com/images/I/919WO8q-nnL._SL1500_.jpg",
            songs: [],
            name: "Welcome: It's Time to Chill"
        }
    ],
    playlistId: 1
    }

    this.playlistElement = React.createRef();

    // Create playlistRef to store the user and its playlist
    this.playlistRef = firebase.database().ref("playlist")
  }

  componentDidMount() {
    this.authListener();
    // this.getUserData();
  }
  
  componentDidUpdate(prevProps, prevState) {
    // check on previous state
    // only write when it's different with the new state
    // if (prevState !== this.state) {
    //   this.writeUserData();
    // }
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
    let playlist = playlists[id]
    playlist.songs.push(song)
  }


  selectSong(song) {
    this.setState({currSong: {song}})
  }

  authListener() {
      firebase.auth().onAuthStateChanged(
        (user) => {
          
          if(user) {
            this.setState({user});
            // console.log("here");
            localStorage.setItem('user', user.uid);
            const userRef = this.playlistRef.child(user.uid);
            userRef.on("value", (snapshot) => {
              this.setState({playlist: snapshot.val()})
            })

            // userRef.on("value", (snapshot) => {
            //   this.setState({playlist})
            // })
          } else {
            this.setState({user:null});
            // console.log("here");
            localStorage.removeItem('user')
          }
        }
      )
  }

  save = () => {
    console.log( "hello",firebase.auth().currentUser)
    // const playlistRef = this.playlistRef.child(firebase.auth().currentUser.uid);
    // playlistRef.set({playlist: this.playlist})
  }

  

  logout = () => {
    firebase.auth().signOut();
  }

  writeUserData = () => {
    let user = firebase.database().ref(localStorage.user)
    console.log('DATA SAVED');
  }
  // getUserData = () => {
  //   let ref = firebase.database().ref(localStorage.user);
  //   ref.on('value', snapshot => {
  //     const state = snapshot.val();
  //     this.setState(state);
  //   });
  //   console.log('DATA RETRIEVED');
  // }

  render() {
    if (!this.state.user) {
      return (
        <div>
          <Login />
          {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> */}
        </div>
      );
    }
    // firebase.database().ref('/').set(this.state);
    // console.log('this',localStorage.user);

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
                {/* <Route exact path='/home'>
                  <HomePage currSong={this.state.currSong} setSong={this.selectSong.bind(this)}/>
                </Route> */}
                <Route exact path='/playlist' render={() => <PlayListPage playlistId={this.state.playlistId} ref={this.playlistElement} playlists={this.state.playlists} addPlaylist={this.addPlaylist} 
                trending={this.state.trending} save={this.save}/>} />
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
