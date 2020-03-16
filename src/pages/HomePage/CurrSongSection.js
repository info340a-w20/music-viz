import React from 'react';

export class CurrSongSection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={'d-flex justify-content-center m-3'}>
                <div className={'p-4'}>
                    <h3>{this.props.currSong.name}</h3>
                    <p style={{textAlign: 'left'}}>{this.props.currSong.artist}</p>
                </div>
                <div>
                    <img src={this.props.currSong.cover} alt={this.props.currSong.name} />
                </div>
            </div>
        )
    }
}