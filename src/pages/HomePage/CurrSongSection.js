import React from 'react';

export class CurrSongSection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={'d-flex justify-content-center m-3'}>
                <div className={'p-4'}>
                    <h3>{this.props.currSong.song.title}</h3>
                    <p style={{textAlign: 'left'}}>{this.props.currSong.song.artist.name}</p>
                </div>
                <div>
                    <img src={this.props.currSong.song.album.cover} alt={this.props.currSong.song.title} />
                </div>
            </div>
        )
    }
}