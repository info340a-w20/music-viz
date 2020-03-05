import React from 'react';
import { RectVis } from './RectVis';

export class VisSection extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.shape == "Circle") {
            
        } else {
            return (
                <div>
                    <RectVis width={this.props.width} color={this.props.color} currSong={this.props.currSong} getRenderFunc={this.props.getRenderFunc} />
                </div>
            )
        }
    }
}