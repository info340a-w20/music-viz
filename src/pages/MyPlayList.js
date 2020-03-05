import React, {Component} from 'react';


export default class MyPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrack: null,
            searchSong: '',
            querySong: '',
            querySongList: []
        };
    }
    
    playSong = (preview) => {
        this.setState({src: preview});
    }

    querySong = (query) => {
        // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
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

    
    
    render() {
        let id = this.props.match.params.playlistId;
        let playlist = this.props.playlists.filter((playlist) => playlist.id == id)[0];
        if (id.includes('trending')) {
            playlist = this.props.trending.filter((playlist) => playlist.id == id)[0];
        }
        console.log(this.state.searchSong.length)
        return(
            <div>
                <div>
                    <Cover playlist={playlist}/>
                    <button id="btn-add-song" type="button">Add Songs</button>
                    <SearchForm value={this.state.querySong}  query={this.querySong} querySong={this.state.querySong} onUpdate={this.onUpdate} formType={'add-song'}/>
                    <SearchForm value={this.state.searchSong}  searchSong={this.state.searchSong} onUpdate={(val) => {this.setState({searchSong:val})} }/>
                    <SongTable playlist={playlist} playSong={this.playSong} searchSong={this.state.searchSong}/>
                    <QuerySongTable playlist={this.state.querySongList} playSong={this.playSong}/>
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
                        <h2>{this.props.playlist.name}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

export class SearchForm extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        let button;
        if(this.props.formType == 'add-song') {
            button = <button type="button" onClick={() => this.props.query(this.props.querySong)} className="btn btn-outline-info" value='Update'>Search</button>
        }

        return(
            <div>
                <div className={this.props.formType == 'add-song' ? "add-song" : "search-song"}>
                    <form className="m-3 form-inline">
                        <input placeholder="Search" type="text" value={this.props.querySong} onChange={e => this.props.onUpdate(e.target.value)} className="mr-sm-2 form-control"></input>
                        {button}
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
        let filtered = this.props.playlist.songs.filter((e) => {
            if(this.props.searchSong.length == 0) {
                return true
            }
            let upperName = e.name.toUpperCase();
            let upperArtist = e.artist.toUpperCase();
            // console.log(upper, this.props.searchSong)

            return (upperName.includes(this.props.searchSong.toUpperCase()) || upperArtist.includes(this.props.searchSong.toUpperCase()))
        })

        let row = filtered.map((d,i) => {
            return (
                <SongList key={i} song={d} playSong={this.props.playSong}/>
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
        let headers = ['#', 'Song', 'Artist', '', '']
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
    render() {
        console.log(this.props.song.cover)
      return (
        <tr className='song-table'>
            <td><img className="album" src={this.props.song.cover}/></td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><i className="fa fa-heart"></i></td>
            <td><Music url={this.props.song.preview}/></td>
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
          <i className={this.state.play ? "fa fa-pause-circle fa-3x" : "fa fa-play-circle fa-3x"} onClick={this.togglePlay}></i>
        </div>
      );
    }
  }


  export class QuerySongList extends Component {
    render() {
      return (
        <tr className='song-table'>
            <td><img className="album" src={this.props.song.cover}/></td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><Music url={this.props.song.preview}/></td>
            <td><i className="fa fa-plus-circle fa-3x"></i></td>
        </tr>
      )
    }
  }


  export class QuerySongTable extends Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        let row = this.props.playlist.map((d,i) => {
            return (
                <QuerySongList key={i} song={d} playSong={this.props.playSong}/>
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
  