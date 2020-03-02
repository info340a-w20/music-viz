import React from 'react';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



export class SongCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
            <Card className={'m-2 card'} style={{transition: '1s', height: '8rem'}}>
                <div className={'d-flex flex-row'}>
                    <CardContent>
                        <Typography>
                            {this.props.title}
                        </Typography>
                        <Typography>
                            {this.props.artist}
                        </Typography>
                    </CardContent>
                    <CardMedia image={this.props.image} title={this.props.title} style={{height: '150px', width: '150px'}} />
                </div>
            </Card>
       )
    }
}