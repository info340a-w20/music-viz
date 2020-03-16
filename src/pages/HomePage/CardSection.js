import React from 'react';
import { SongCard } from '../../components/SongCard';
import { Dropdown } from 'react-bootstrap';





export class CardSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cardList = [];
        // console.log("song list:")
        if (this.props.playlists != undefined) {
            console.log(this.props.playlists[0])
        }
        if (this.props.songList != undefined) {
            // console.log(Object.values(this.props.songList.songs));
            Object.values(this.props.songList.songs).forEach((song, i) => {
                // console.log(song)
                cardList.push(<SongCard key={i} song={song} renderCanvas={this.props.renderCanvas} title={song.name} artist={song.artist} 
                                                image={song.cover} preview={song.preview} setSong={this.props.setSong} color={this.props.color} width={this.props.width} />)
            })
        }
        
        return (
            <div id={'songCardSection'}>
                <div>
                <Dropdown className={'m-2 float-left ml-5'}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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