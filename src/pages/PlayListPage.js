import React, {Component} from 'react';
import { HashRouter as Router, Route, Link, useParams } from "react-router-dom";

export default class PlayListPage extends Component {

    state= {
        showForm: false
    }

    render() {
        let renderedCovers = this.props.trending.map((cover) => {
            return <Cover key='' src={cover.src} id={cover.id} />;
        });
        let renderedPlaylist = this.props.playlists.map((cover) => {
            return <Cover src={cover.cover} id={cover.id} />;
        });

      return (
          <div>
              <div className="top-wrapper">
                  <div className='card text-center toplist'>
                    <div class="card-header">
                        Your Top Play List
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Chillin' with Friends</h5>
                    </div>
                    <div class="card-footer text-muted">
                        2 days ago
                    </div>
                  </div>
              </div>
              <div id="title-playlist">
                <h1 id="mylist">Your Play List</h1>
                <div id="circle" style={{display: 'inline'}} >
                    <i className="fa fa-plus-circle" onClick={() => this.setState({showForm: true})}></i>
                </div>
            <div>

                </div>
              </div>
              <div className="container">
                    <div className="row">
                        {renderedPlaylist}
                        {this.state.showForm && <PlayListForm addPlaylist={this.props.addPlaylist} />}
                    </div>
              </div>
              <div className="container">
                  <div className="row">
                    {renderedCovers}
                  </div>
              
              </div>
          </div>
      );
    }
    
}

class Cover extends Component {

    render() {
        let src = this.props.src;
        let id = this.props.id;
        return (
            <div className="col-md-3 col-6">
                <div className="card">
                    <Link to={"/playlist/" + id}>
                        <div className="overlayer">
                            <i className="fa fa-play-circle"></i>
                        </div>
                        <img src={src} alt=""></img>
                        <div className="title">
                            
                            <p>Hover over</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

}

class PlayListForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="name-form col-md-3 col-6">
                <div className="card">
                    <p>Name</p>
                    <input type="text" id="name" placeholder="My Playlist..."></input>
                    <input type="text" id="url" placeholder="Your image URL..."></input>
                </div>
                <div className="submit">
                    <button type="button" id="submit-button" onClick={() => this.props.addPlaylist("")}>Submit</button>
                    <button type="button" id="cancel-button">Cancel</button>
                </div>
            </div>
        )
    }
}