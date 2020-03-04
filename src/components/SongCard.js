import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



export class SongCard extends React.Component {
    constructor(props) {
        super(props);
    }

    // selectSong() {
    //     // var audio = document.getElementById("audio");
    //     // audio.src = this.props.preview;
    //     // renderCanvas();
        
    // }

    render() {
       return (
            <Card className={'m-2 card'} onClick={(event) => this.props.setSong(this.props.song)} style={{transition: '1s', height: '6rem', width: '20rem', backgroundColor: 'rgba(255, 255, 255, .15)', color: 'white'}}>
                <div className={'d-flex flex-row'}>
                    <CardContent className={'d-flex flex-column'} style={{width: '15rem', height: '100%'}}>
                        <Typography style={{wordBreak: 'normal', textOverflow: 'ellipsis'}}>
                            {this.props.title}
                        </Typography>
                        <Typography>
                            {this.props.artist}
                        </Typography>
                    </CardContent>
                    <CardMedia image={this.props.image} title={this.props.title} style={{height: '100px', width: '100px'}} />
                </div>
            </Card>
       )
    }
}