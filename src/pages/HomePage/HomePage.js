import React from 'react';
import { CardSection } from './CardSection';
import { CurrSongSection } from './CurrSongSection';
import { RectVis } from './vis/RectVis'
import { VisSection } from './vis/VisSection';
import { Controls } from './Controls';

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            shape: "Rectangle",
            width: 1,
            songList: [],
            renderCanvas: ""
        }
    }

    componentWillMount() {
        this.querySong("get your wish");
    }

    changeControls(key, val) {
        let newState = {};
        newState[key] = val;
        console.log(newState)
        this.setState(newState);
    }

    getRenderFunc(func) {
        this.setState({renderCanvas: {func}})
    }

    querySong(query) {
        // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
        let songSearch = fetch('https://polar-falls-56753.herokuapp.com/?search=' +query)
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({songList: data.data});
            this.props.setSong(data.data[0])
        }).catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <CardSection songList={this.state.songList} setSong={this.props.setSong} renderCanvas={this.state.renderCanvas} 
                            color={this.state.color} width={this.state.width} />
                <div id={'currSong'}>
                    <CurrSongSection currSong={this.props.currSong} setSong={this.props.setSong}/>
                </div>
                <div id={'canvasContainer'} className={'d-flex'}>
                    {/* <RectVis width={this.state.width} color={this.state.color} song={this.props.currSong} /> */}
                    <Controls changeControls={this.changeControls.bind(this)}/>
                    <VisSection width={this.state.width} color={this.state.color} currSong={this.props.currSong} />
                </div>
                <div>
                </div>
            </div>
        )
    }
}
