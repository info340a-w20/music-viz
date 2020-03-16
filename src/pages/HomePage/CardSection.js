import React from 'react';
import { SongCard } from '../../components/SongCard';
import { Dropdown } from 'react-bootstrap';





export class CardSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let dropdown = [];
        // console.log("song list:")
        if (this.props.playlists != undefined) {
            // console.log(this.props.playlists)
            Object.values(this.props.playlists).forEach((playlist, i) => {
                // console.log(playlist)
                // dropdown.push({
                //     name: playlist.name,
                //     id: playlist.id
                // })
            // console.log(playlist)
            dropdown.push(<Dropdown.Item key={i} onClick={() => {this.props.selectPlaylist(playlist.id)}}> {playlist.name}</Dropdown.Item>)
            })
        }
        // console.log(dropdown);

        let cardList = [];
        // console.log(this.props.songList);
        if (this.props.songList != undefined) {
            // console.log(Object.values(this.props.songList.songs));
            if (this.props.songList.songs != undefined) {
                Object.values(this.props.songList.songs).forEach((song, i) => {
                    // console.log(song)
                    cardList.push(<SongCard key={i} song={song} renderCanvas={this.props.renderCanvas} title={song.name} artist={song.artist} 
                                                    image={song.cover} preview={song.preview} setSong={this.props.setSong} color={this.props.color} width={this.props.width} />)
                })
            }
        }
        
        return (
            <div id={'songCardSection'}>
                <div>
                <Dropdown className={'m-2 float-left ml-5'}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Playlist
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {dropdown}
                    </Dropdown.Menu>
                </Dropdown>
                </div>
                <div id={'songCardList'}>
                    {cardList}
                </div>
            </div>
        )
    }
}