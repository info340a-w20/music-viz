import React from 'react';
import { SongCard } from '../../components/SongCard';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export class CardSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cardList = [];
        for (let i = 0; i < this.props.songList.length; i++) {
            let song = this.props.songList[i];
            cardList.push(<SongCard key={i} song={song} title={song.title} artist={song.artist.name} image={song.album.cover} preview={song.preview} setSong={this.props.setSong} />)
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