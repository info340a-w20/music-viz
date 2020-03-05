import React, {Component} from 'react';


export default class MyPlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTrack: null,
            searchSong: '',
            querySong: '',
            querySongList: [],
            showQueryTable: false
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

    showQTable = () => {
        this.setState({
            showQueryTable: !this.state.showQueryTable
        })
    };

    

    
    
    render() {
        let id = this.props.match.params.playlistId;
        let playlist = this.props.playlists.filter((playlist) => playlist.id == id)[0];
        
        if (id.includes('trending')) {
            playlist = this.props.trending.filter((playlist) => playlist.id == id)[0];
        }

        // console.log('using thisssss:', playlist)


        return(
            <div>
                <div>
                    <Cover playlist={playlist}/>
                    <SearchForm value={this.state.querySong} showQTable={this.showQTable} query={this.querySong} querySong={this.state.querySong} onUpdate={this.onUpdate} formType={'add-song'}/>
                    {!this.state.showQueryTable && <SearchForm value={this.state.searchSong}  searchSong={this.state.searchSong} onUpdate={(val) => {this.setState({searchSong:val})} }/>}
                    {!this.state.showQueryTable && <SongTable heart={this.state.heart} playlist={playlist} playSong={this.playSong} searchSong={this.state.searchSong}/>}
                    {this.state.showQueryTable && <QuerySongTable showQTable={this.showQTable} id={id} querySong={this.state.querySongList} playSong={this.playSong} addSong={this.props.addSong}/>}
                    
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
        let placeholder = 'Search songs...'
        if(this.props.formType == 'add-song') {
            button = <button type="button" onClick={() => {this.props.query(this.props.querySong); this.props.showQTable( )}}  className="btn-playlist btn btn-outline-info" value='Update'>Search</button>
            placeholder = 'Songs to add...'
        }

        return(
            <div>
                <div className={this.props.formType == 'add-song' ? "add-song" : "search-song"}>
                    <form className={this.props.formType == 'add-song' ? "my-list m-3 form-inline": "m-3 form-inline"}>
                        <input placeholder={placeholder} type="text" value={this.props.querySong} onChange={e => this.props.onUpdate(e.target.value)} className="mr-sm-2 form-control"></input>
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

            return (upperName.includes(this.props.searchSong.toUpperCase()) || upperArtist.includes(this.props.searchSong.toUpperCase()))
        })

        let row = filtered.map((d,i) => {
            return (
                <SongList heart={this.props.heart} key={i} song={d} playSong={this.props.playSong}/>
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
    render() {
      return (
        <tr className='song-table'>
            <td><img className="album" src={this.props.song.cover}/></td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><i onClick={()=> this.heartClick()} className="fa fa-heart fa-2x" style={this.state.heart ? {color:'palevioletred'}:{color:'white'}}></i></td>
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

    state = {
        color: true
    }
    plusClick = () => {
        this.setState({ heart: !this.state.heart })
    }

    render() {
        // Push the 'song' prop up when click plus circle
      return (
        <tr className='song-table'>
            <td><img className="album" src={this.props.song.cover}/></td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><Music url={this.props.song.preview}/></td>
            <td><i onClick={()=> {this.props.addSong(this.props.song, this.props.id); this.plusClick()}} style={this.state.heart ? {color:'palevioletred'}:{color:'white'}} className="fa fa-plus-circle fa-3x"></i></td>
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
                <QuerySongList id={this.props.id} playlist={this.props.playlist} addSong={this.props.addSong} key={i} song={d} playSong={this.props.playSong}/>
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
  