import React, {Component} from 'react';
import { HashRouter as Router, Route, Link, useParams } from "react-router-dom";

export default class PlayListPage extends Component {
    constructor() {
        super()
        this.state = {
            showForm: false,
            playListName: '',
            imgUrl:''
        }
    }
    

    handleForm = () => {
        this.setState({showForm: false})
    }

    onUpDateName = (val) => {
        this.setState({playListName: val})
    }

    onUpdateUrl = (val) => {
        this.setState({imgUrl: val})
    }

    render() {
        let renderedCovers = this.props.trending.map((cover, i) => {
            return <Cover key={'trending-'+i} src={cover.cover} id={cover.id} name={cover.name}/>;
        });
        let renderedPlaylist = this.props.playlists.map((cover, i) => {
            return <Cover key={'playlist-' + i}  src={cover.cover} id={cover.i} name={cover.name} />;
        });

        console.log(this.state.playListName)

      return (
          <div>
              <div className="top-wrapper">
                  <div className='card text-center toplist'>
                    <div className="card-header">
                        Your Top Play List
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Chillin' with Friends</h5>
                    </div>
                    <div className="card-footer text-muted">
                        2 days ago
                    </div>
                  </div>
              </div>
              <div id="title-playlist">
                <h1 id="mylist">Your Play List</h1>
                <div id="circle" style={{display: 'inline'}} >
                    <i className="fa fa-plus-circle" onClick={() => this.setState({showForm: true})}></i>
                </div>
              </div>
              <div className="container">
                    <div className="row">
                        {renderedPlaylist}
                        {this.state.showForm && <PlayListForm addPlaylist={this.props.addPlaylist} handleForm={this.handleForm} 
                        onUpDateName={this.onUpDateName} onUpdateUrl={this.onUpdateUrl} playListName={this.state.playListName} imgUrl={this.state.imgUrl}/>}
                    </div>
              </div>
              <div id="title-playlist">
                <h1 id="mylist">Trending</h1>
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
        let name = this.props.name;

        return (
            <div className="col-md-3 col-sm-6 col-6">
                <div className="card">
                    <Link to={"/playlist/" + id}>
                        <div className="overlayer">
                            <i className="fa fa-play-circle"></i>
                        </div>
                        <img src={src} alt=""></img>
                        
                    </Link>
                </div>
                <Link to={"/playlist/" + id}>
                    <div className="title">
                        <p>{name}</p>
                    </div>
                </Link>
                
            </div>
        )
    }

}

class PlayListForm extends Component {
    constructor(props) {
        super(props)
        // this
    }

    render() {
        return(
            <div className="col-md-3 col-6">
                <div className="name-form form-card">
                    <div className="form-card">
                        <h5>Create New Playlist</h5>
                        <input type="text" id="name" placeholder="My Playlist..." value={this.props.playListName} onChange={(e) => this.props.onUpDateName(e.target.value)}></input>
                        <input type="text" id="url" placeholder="Your image URL..." value={this.props.imgUrl} onChange={(e) => this.props.onUpdateUrl(e.target.value)}></input>
                    </div>
                    <div className="submit">
                        <button type="button" id="submit-button" onClick={() => {this.props.addPlaylist(""); this.props.handleForm()}}>Submit</button>
                        <button type="button" id="cancel-button" onClick={() => this.props.handleForm()}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}