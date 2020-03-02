import React from 'react';
import { SongCard } from '../../components/SongCard';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currSong: {},
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
            this.setState({songList: data.data})
        }).catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <CardSection songList={this.state.songList} />
                <div id={'currSong'}>

                </div>
                <div id={'canvasContainer'}>

                </div>
                {/* put controls here */}
            </div>
        )
    }
}

export class CardSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cardList = [];
        console.log(this.props.songList.data)
        for (let i = 0; i < this.props.songList.length; i++) {
            let song = this.props.songList[i];
            cardList.push(<SongCard key={i} title={song.title} artist={song.artist.name} image={song.album.cover} />)
        }
        return (
            <div id={'songCardSection'}>
                <div className={'d-inline'}>
                    <Form inline className={'float-right m-3'}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </div>
                <div id={'songCardList'}>
                    {cardList}
                </div>
            </div>
        )
    }
}