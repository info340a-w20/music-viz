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
            <Card>
                <div>
                    <CardContent>
                        <Typography>
                            {this.props.title}
                        </Typography>
                        <Typography>
                            {this.props.author}
                        </Typography>
                    </CardContent>
                    <CardMedia image={this.props.image} title={this.props.title} />
                </div>
            </Card>
       )
    }
}