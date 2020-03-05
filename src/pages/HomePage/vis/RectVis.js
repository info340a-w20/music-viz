import React from 'react';

export class RectVis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {context:new AudioContext()}
    }

    componentWillMount() {
        // this.props.getRenderFunc(this.renderCanvas.bind(this));
    }
    componentDidUpdate() {
      this.renderCanvas();
    }
    play() {
      this.audio.play()
      console.log("play")
    }
    renderCanvas() {
        console.log("render canvas")
        // var audio = document.getElementById("audio");
        // this.state.context.close();
        var audio = this.audioArea;
        audio.crossOrigin = "anonymous";
        audio.src = this.props.currSong.song.preview;
    
        audio.load();
        audio.play();
        // var context = new AudioContext();
        // context.close()
        // context.src ? context.src : context.createMediaElementSource(audio);
        // var src = this.state.context.createMediaElementSource(audio);
        var analyser = this.state.context.createAnalyser();
    
        // var canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        var ctx = this.canvas.getContext("2d");
    
        // this.state.src.connect(analyser);
        analyser.connect(this.state.context.destination);
    
        analyser.fftSize = 256;
    
        var bufferLength = analyser.frequencyBinCount;
    
        var dataArray = new Uint8Array(bufferLength);

        var WIDTH = this.canvas.width;
        var HEIGHT = this.canvas.height;
        
        let color = this.props.color;
        let stateWidth = this.props.width;
        function renderRect() {
          // console.log(color)
          // console.log(stateWidth)
          requestAnimationFrame(renderRect);
          x = 0;
        
          analyser.getByteTimeDomainData(dataArray);
          // analyser.getByteFrequencyData(dataArray);

          console.log(dataArray);
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
          for (var i = 0; i < bufferLength; i++) {
            // console.log("buffer", dataArray[i])
            barHeight = dataArray[i] * 2;
            // console.log("bar height", barHeight)
    
            var r = barHeight + (25 * (i / bufferLength));
            var g = 250 * (i / bufferLength);
            var b = 50;
    
            if (color == "Default" || color == "") {
              ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            } else { // if (state.color != "") {
              ctx.fillStyle = color;
            }
            // console.log(barHeight);
            ctx.fillRect(x, HEIGHT - barHeight, barWidth * stateWidth, barHeight);
            // ctx.fillRect(10, 10, 100,100);
    
            x += barWidth * stateWidth + 1;
          }
        }
    
        // audio.play();
        // if (this.props.shape == "Square") {
    
        // } else if (state.shape == "Circle") {
        //   console.log("state = circle");
        //   renderCircle();
        // } else if (state.shape == "Triangle") {
          
        // } else if (state.shape == "Rectangle") {
          console.log("state = Rectangle");
          var barWidth = 20;
          var barHeight = 20;
          var x = 0;     
          renderRect();
        // } 
    };

    render() {
        return (
            <div className={'d-flex flex-column justify-content-center align-items-center'}>
                <canvas ref={(node) => { this.canvas = node; }} id="canvas"></canvas>
                <audio onClick = {this.play} id="audio" ref={(node) => { this.audioArea = node; }} controls style={{width: '100%'}} className="my-3"></audio>
            </div>
        )
    }
}