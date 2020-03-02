import React, {Component} from 'react';


export default class PlayListPage extends Component {

    state= {
        trending: [
            {
                src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg"
            },
            {
                src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg"
            },
            {
                src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg"
            },
            {
                src: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg"
            }
        ],
        playlists: [
            {
                id: 0,
                cover: "https://pbs.twimg.com/profile_images/1222571834488623104/zsWD1O8K_400x400.jpg",
                songs: [
                    
                ]
            }
        ]
    }

    render() {
        let renderedCovers = this.state.trending.map((cover) => {
            return <Cover src={cover.src} />;
        });
        let renderedPlaylist = this.state.playlists.map((cover) => {
            return <Cover src={cover.cover} />;
        });

        let addPlayList = () => {
            
        }

      return (
          <div>
              <div id="title-playlist">
                <h1 id="mylist">Your Play List</h1>
                <div id="circle" style={{display: 'inline'}} >
                    <i className="fa fa-plus-circle" onClick=""></i>
                </div>
            <div>

                </div>
              </div>
              <div className="container">
                    <div className="row">
                        {renderedPlaylist}
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
        return (
            <div className="col-md-3 col-6">
                <div className="card">
                    <div className="overlayer">
                        <i class="fa fa-play-circle"></i>
                    </div>
                    <img src={src} alt=""></img>
                    <div className="title">
                        <a href="#">Hover over</a>
                    </div>
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
                    <input type="text" id="url" placeholder="Your image URL..." style="display: block;"></input>
                </div>
                <div class="submit">
                    <button type="button" id="submit-button">Submit</button>
                    <button type="button" id="cancel-button">Cancel</button>
                </div>
            </div>
        )
    }
}