import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
//   firebase.initializeApp(firebaseConfig);

  class Login extends Component {
      constructor(props) {
          super(props);
          this.login = this.login.bind(this);
          this.handleChange = this.handleChange.bind(this)
          this.state = {
              email: '',
              password: ''
          }
      }

      login(e) {
          e.preventDefault();
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
          }).catch((error) => {
              console.log(error);
          })
      }

      signup=(e) => {
          e.preventDefault();
          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
              console.log(error);
          })
        //   let newUser = firebase.database().ref('user').child(this.state.email)
      }

      handleChange(e) {
          this.setState({[e.target.name]: e.target.value});
      }

      render() {
          return(
            <div className={'d-flex flex-column align-items-center'}>
                <h1 className="m-5">Welcome to our Music Visualizer and Playlist Maker!</h1>
                <p>Please login or create an account.</p>
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1"> Email address: </label>
                            <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email" />
                            
                        </div>
                        <div className="form-group">
                        <label for="exampleInputPassword1"> Password: </label>
                            <input value={this.state.password} onChange={this.handleChange} type="password" name="password"
                            className="form-control" id="exampleInputPassword1"
                            placeholder="Password" />
                        </div>
                        <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                        <button onClick={this.signup} style={{marginLeft:'25px'}} className="btn btn-success">Signup</button>

                    </form>

                </div>
              </div>
          )
      }
  }

  export default Login;