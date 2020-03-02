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
      return (
          <div>
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