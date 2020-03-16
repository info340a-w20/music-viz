import React, {Component} from 'react';
import { HashRouter as Router, Route, Link, useParams } from "react-router-dom";
import firebase from "firebase/app";

export default class PlayListPage extends Component {
    constructor() {
        super()
        this.state = {
            showForm: false,
            playListName: '',
            imgUrl:''
        }
    }
    

    handleForm = () => {
        this.setState({showForm: false})
    }

    onUpDateName = (val) => {
        this.setState({playListName: val})
    }

    onUpdateUrl = (val) => {
        this.setState({imgUrl: val})
    }

    render() {

        let renderedPlaylist = this.props.playlists.map((cover, i) => {
            return <Cover key={'playlist-' + i}  src={cover.cover} id={cover.id} name={cover.name} user={this.props.user} removePlaylist={this.props.removePlaylist}/>;
        });
      return (
          <div>
                <div className="top-wrapper mt-2">
                    <div className='text-center toplist'>
                    <div className="card-header">
                        This Week's Top Playlist
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Time to Chill</h2>
                    </div>
                    </div>
                </div>
              <div id="title-playlist">
                <h1 id="mylist">Your Play List</h1>
                <div id="circle" style={{display: 'inline'}} >
                    <i className="fa fa-plus-circle add-playlist" onClick={() => this.setState({showForm: true})}></i>
                </div>
              </div>
              <div className="container">
                    <div className="row">
                        {renderedPlaylist}
                        {this.state.showForm && <PlayListForm playlistId={this.props.playlistId} addPlaylist={this.props.addPlaylist} user={this.props.user} handleForm={this.handleForm} 
                        onUpDateName={this.onUpDateName} onUpdateUrl={this.onUpdateUrl} playListName={this.state.playListName} imgUrl={this.state.imgUrl} state={this.state}/>}
                    </div>
              </div>
          </div>
      );
    }
    
}

class Cover extends Component {
    removePlaylist = () => {
        let id = this.props.id;
        firebase.database().ref("users").child(this.props.user.uid).child("playlists").child(id).remove();
    }

    render() {
        let src = this.props.src;
        let id = this.props.id;
        let name = this.props.name;

        

        return (
            <div className="col-xs-12 col-sm-6 col-md-3 m-3">
                
                
                <div className="card">
                    <Link to={"/playlist/" + id}>
                        <div className="overlayer">
                            <i class="fa fa-window-close close" onClick={(e) => {
                                e.preventDefault()
                                this.removePlaylist(id);
                            }}></i>
                            <i className="fa fa-play-circle"></i>
                        </div>
                        <img src={src} alt=""></img>
                        
                    </Link>
                    
                </div>
                <Link to={"/playlist/" + id}>
                    <div className="title">
                        <p>{name}</p>
                    </div>
                </Link>
                
            </div>
        )
    }

}

class PlayListForm extends Component {
    constructor(props) {
        super(props)
    }

    addPlaylist = (state) => {
        let playlist = {
            id: this.props.playlistId,
            cover: "https://s1.mzstatic.com/us/r1000/092/Purple/v4/d4/01/51/d4015162-3d37-04f3-3493-8bcb908e9315/mzl.wrmgngoh.png",
            songs: [],
            name: 'My Playlist'
        }
        if (state.playListName.length > 0) {
            playlist.name = state.playListName
        }
        if (state.imgUrl.length > 0) {
            playlist.cover = state.imgUrl
        }
            
        firebase.database().ref("users").child(this.props.user.uid).child("playlists").push(playlist);
    }

    

    
    

    render() {
        let url = this.props.imgUrl
        let name = this.props.playListName

        // if(url.length != 0) {
        //     playlist.cover = url
        // }

        // if(name.length != 0) {
        //     playlist.name = name
        // }

        return(
            <div className="col-xs-12 col-sm-6 col-md-3 m-3">
                <div className="name-form form-card">
                    <div className="form-card">
                        <h5>Create New Playlist</h5>
                        <input type="text" id="name" placeholder="My Playlist..." value={this.props.playListName} onChange={(e) => this.props.onUpDateName(e.target.value)}></input>
                        <input type="text" id="url" placeholder="Your image URL..." value={this.props.imgUrl} onChange={(e) => this.props.onUpdateUrl(e.target.value)}></input>
                    </div>
                    <div className="submit">
                        <button type="button" id="submit-button" onClick={() => {this.addPlaylist(this.props.state); this.props.handleForm()}}>Submit</button>
                        <button type="button" id="cancel-button" onClick={() => this.props.handleForm()}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}