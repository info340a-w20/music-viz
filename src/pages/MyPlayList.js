import React, {Component} from 'react';
import firebase from "firebase/app";

export default class MyPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrack: null,
            searchSong: '',
            querySong: '',
            querySongList: [],
            showQueryTable: false,
            loading: true,
            edit: false
        };
    }

    clickEdit = () => {
        this.setState({edit: !this.state.edit})
    }
    
    playSong = (preview) => {
        this.setState({src: preview});
    }

    back = () => {
        this.props.history.push("/playlist")
    }

    querySong = (query) => {
        let songSearch = fetch('https://polar-falls-56753.herokuapp.com/?search=' + query)
        .then((resp) => resp.json())
        .then((data) => {
            let songList = [];
            let length = data.data.length;
            if (length > 10) {
                length = 10;
            }
            for (let i = 0; i < length; i++) {
                let songInfo = {};
                songInfo.name = data.data[i].title;
                songInfo.artist = data.data[i].artist.name;
                songInfo.preview = data.data[i].preview;
                songInfo.cover = data.data[i].album.cover_medium;
                console.log(data.data[i])
                songList.push(songInfo);
            }
            this.setState({querySongList: songList});
        }).catch(err => console.error(err));
    }

    onUpdate = (val) => {
        this.setState({
          querySong: val
        })
      };

    showQTable = () => {
        this.setState({
            showQueryTable: !this.state.showQueryTable
        })
    };
    
    render() {

        // if (this.state.loading) {
        //     return null
        // }

        if (this.props.playlists.length === 0) {
            return null;
        }
        
        let playlists = this.props.playlists;
        let id = this.props.match.params.playlistId;
        let playlist = playlists.filter((playlist) => playlist.id == id)[0];
        
        // if (id.includes('trending')) {
        //     playlist = this.props.trending.filter((playlist) => playlist.id == id)[0];
        // }

        // console.log('using thisssss:', playlist)


        return(
            <div>
                <div className="back-wrapper">
                    <button className='back-btn' onClick={this.back}>Back</button>
                </div>
                
                <div>
                    <Cover playlist={playlist}/>
                    <SearchForm value={this.state.querySong} showQTable={this.showQTable} query={this.querySong} querySong={this.state.querySong} onUpdate={this.onUpdate} formType={'add-song'}/>
                    {!this.state.showQueryTable && <SearchForm value={this.state.searchSong}  searchSong={this.state.searchSong} onUpdate={(val) => {this.setState({searchSong:val})} } clickEdit={this.clickEdit}/>}
                    {!this.state.showQueryTable && <SongTable user={this.props.user} heart={this.state.heart} playlist={playlist} playSong={this.playSong} searchSong={this.state.searchSong} edit={this.state.edit}/>}
                    {this.state.showQueryTable && <QuerySongTable user={this.props.user} id={id} showQTable={this.showQTable} querySong={this.state.querySongList} playSong={this.playSong} addSong={this.props.addSong}/>}
                    
                </div>
            </div>
            
        )
            
    }
}

export class Cover extends Component {

    render() {
        return(
            <div>
                <div className="playlist-cover">
                    <img src={this.props.playlist.cover}></img>
                    <div>
                        <h2 className="cover-header">{this.props.playlist.name}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: 'Edit'
        }
    }

    changeEdit = () => {
        if (this.state.edit == 'Edit') {
            this.setState({edit: 'Back'})
        } else {
            this.setState({edit: 'Edit'})
        }
        
    }

    render() {
        let button;
        let editBtn;
        let placeholder = 'Search songs...'
        if(this.props.formType == 'add-song') {
            button = <button type="button" onClick={() => {this.props.query(this.props.querySong); this.props.showQTable()}}  className="btn-playlist btn btn-outline-info m-2" value='Update'>Search</button>
            placeholder = 'Songs to add...'
        } else {
            editBtn = <button onClick={()=> {this.props.clickEdit(); this.changeEdit()}} className="edit-btn" type="button"> {this.state.edit} </button>
        }
        
        return(
            <div>
                <div className={this.props.formType == 'add-song' ? "add-song" : "search-song"}>
                    <form className={this.props.formType == 'add-song' ? "my-list m-3 form-inline": "m-3 form-inline search-edit"}>
                        <input placeholder={placeholder} type="text" value={this.props.querySong} onChange={e => this.props.onUpdate(e.target.value)} className="mr-xs-2 mr-sm-2 form-control"></input>
                        {button}
                        {editBtn}
                    </form>
                </div>
            </div>
        )
    }
} 

export class SongTable extends Component {
    constructor(props) {
        super(props)

        
    }

    

    render() {
        let songKeys = Object.keys(this.props.playlist.songs || {});
        let songArray = songKeys.map((key) => {
            let songObj = this.props.playlist.songs[key];
            songObj.id = key;
            return songObj;
        });
        let filtered = songArray.filter((e) => {
            if(this.props.searchSong.length == 0) {
                return true
            }
            let upperName = e.name.toUpperCase();
            let upperArtist = e.artist.toUpperCase();

            return (upperName.includes(this.props.searchSong.toUpperCase()) || upperArtist.includes(this.props.searchSong.toUpperCase()))
        })

        let row = filtered.map((d,i) => {
            return (
                <SongList user={this.props.user} heart={this.props.heart} id={this.props.playlist.id} key={i} song={d} playSong={this.props.playSong} edit={this.props.edit}/>
            )
          });

        return(
            <div>
                <div className="wrapper-tbl">
                    <div className="m2">
                        <table className="song-table">
                            <TableHeader/>
                            <tbody>
                                {row}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
            
        )
    }
}

export class TableHeader extends Component {
    render() {
        let headers = ['Cover', 'Song', 'Artist', '', '']
      let cols = headers.map((header, i)=>{
        let compnent = <th key={"header-"+i}>{header}</th>;
        return(compnent);
      })
      
      return (
        <thead>
          <tr className="song-table">
            {cols}
          </tr>
        </thead>
      )
    }
    
  }

  export class SongList extends Component {
    state = {
        heart: false
    }
    heartClick = () => {
        this.setState({ heart: !this.state.heart })
    }

    removeSong = () => {
        firebase.database().ref("users").child(this.props.user.uid).child("playlists").child(this.props.id).child("songs").child(this.props.song.id).remove();
    }
    render() {
      return (
        <tr className='song-table'>
            <td><img className="album" src={this.props.song.cover}/></td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><Music url={this.props.song.preview}/></td>
            {this.props.edit && <td><i onClick={() => this.removeSong()} className = "fa fa-minus-circle"></i></td>}
            
        </tr>
      )
    }
  }

  export class Music extends React.Component {
    state = {
      play: false
    }
    audio = new Audio(this.props.url)
  
    componentDidMount() {
      this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }
  
    componentWillUnmount() {
      this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
    }
  
    togglePlay = () => {
      this.setState({ play: !this.state.play }, () => {
        this.state.play ? this.audio.play() : this.audio.pause();
      });
    }
  
    render() {
      return (
        <div>
          <i className={this.state.play ? "fa fa-pause-circle" : "fa fa-play-circle"} onClick={this.togglePlay}></i>
        </div>
      );
    }
  }


  export class QuerySongList extends Component {

    state = {
        color: true
    }
    plusClick = () => {
        console.log(this.props.id)
        this.setState({ heart: !this.state.heart })
    }

    addSong = () => {
        let song = {
            cover: this.props.song.cover,
            name: this.props.song.name,
            artist: this.props.song.artist,
            preview: this.props.song.preview

        }
        firebase.database().ref("users").child(this.props.user.uid).child("playlists").child(this.props.id).child("songs").push(song);
    }

    

    render() {
        // Push the 'song' prop up when click plus circle
      return (
        <tr className='song-table'>
            <td><img className="album" src={this.props.song.cover}/></td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><Music url={this.props.song.preview}/></td>
            <td><i onClick={()=> {this.plusClick(); this.addSong()}} style={this.state.heart ? {color:'palevioletred'}:{color:'white'}} className="fa fa-plus-circle"></i></td>
        </tr>
      )
    }
  }


  export class QuerySongTable extends Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        let row = this.props.querySong.map((d,i) => {
            return (
                <QuerySongList user={this.props.user} id={this.props.id} playlist={this.props.playlist} key={i} song={d} playSong={this.props.playSong}/>
            )
          });

        return(
            <div>
                <div className="wrapper-tbl">
                    <div className="m2">
                    <button type="button" onClick={() => {this.props.showQTable()}}  className="btn-playlist btn btn-outline-info" value='Update'>Back to Playlist</button>
                        <table className="song-table">
                            <TableHeader/>
                            <tbody>
                                {row}
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
            
        )
    }
}
  