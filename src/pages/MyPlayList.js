import React, {Component} from 'react';
import { Link } from 'react-router';

const state = {addSongText:'',
            name: 'My Playlist',
            searchSongText:'',
            songNumber:2,
            url: 'https://images-na.ssl-images-amazon.com/images/I/A1JmHktySJL._SL1500_.jpg',
            songList: [{name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3', cover: ''}, 
            {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3', cover: ''}],
            searchList: [],
            data: []};

export default class MyPlayList extends Component {
    constructor(props) {
        super(props)
        
    }
    

    render() {
        
        let id = this.props.match.params.playlistId;
        let playlist = this.props.playlists.filter((playlist) => playlist.id == id)[0];
        console.log(playlist)
        return(
            <div>
                <SongTable songList={state.songList}/>
            </div>
        )
            
    }
}

export class SongTable extends Component {
    constructor(props) {
        super(props)
    }
    

    render() {
        let row = this.props.songList.map((d,i) => {
            return (
                <SongList song={d} />
            )
          });

        return(
            <div>
                <div className="playlist-cover">
                    <img src={state.url}></img>
                    <div>
                        <h2>{state.name}</h2>
                    </div>
                </div>
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
      return (
        <tr className='song-table'>
            <td>Cover</td>
            <td>{this.props.song.name}</td>
            <td>{this.props.song.artist}</td>
            <td><i className="fa fa-heart"></i></td>
            <td><i className="fa fa-play-circle fa-3x"></i></td>
        </tr>
      )
    }
  }