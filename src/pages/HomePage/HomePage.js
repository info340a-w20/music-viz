import React from 'react';
import { CardSection } from './CardSection';
import { CurrSongSection } from './CurrSongSection';
import { RectVis } from './vis/RectVis'

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // currSong: {
            //         artist: {},
            //         title: "",
            //         album: {}
            //     },
            color: "",
            shape: "Rectangle",
            width: 1,
            songList: []
        }
    }

    componentWillMount() {
        this.querySong("get your wish");
    }

    querySong(query) {
        // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
        let songSearch = fetch('https://polar-falls-56753.herokuapp.com/?search=' +query)
        .then((resp) => resp.json())
        .then((data) => {//console.log(data)
            // data.data.forEach(element=> {
            //     this.state.songList = data;
            //     // this.setState({songList: data})
            //     // this.state.app = new App(document.querySelector("main"), state.songList);
            //     // state.app.render();
            // })
            this.setState({songList: data.data,
                        //    currSong: data.data[0] 
                            });
            this.props.setSong(data.data[0])
        }).catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <CardSection songList={this.state.songList} setSong={this.props.setSong} />
                <div id={'currSong'}>
                    <CurrSongSection currSong={this.props.currSong} setSong={this.props.setSong}/>
                </div>
                <div id={'canvasContainer'}>
                    <RectVis width={this.state.width} color={this.state.color} song={this.props.currSong} />
                </div>
                {/* put controls here */}
            </div>
        )
    }
}
