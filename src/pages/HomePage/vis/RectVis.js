import React from 'react';

export class RectVis extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCanvas() {
        var audio = document.getElementById("audio");
        audio.crossOrigin = "anonymous";
    
        audio.load();
        audio.play();
    
        var context = new AudioContext();
        console.log(context);
        var src = context.createMediaElementSource(audio);
        var analyser = context.createAnalyser();
    
        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var ctx = canvas.getContext("2d");
    
        src.connect(analyser);
        analyser.connect(context.destination);
    
        analyser.fftSize = 256;
    
        var bufferLength = analyser.frequencyBinCount;
    
        var dataArray = new Uint8Array(bufferLength);
    
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
    
        function renderRect() {
          requestAnimationFrame(renderRect);
          x = 0;
    
          analyser.getByteFrequencyData(dataArray);
    
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
          for (var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 2;
    
            var r = barHeight + (25 * (i / bufferLength));
            var g = 250 * (i / bufferLength);
            var b = 50;
    
            if (this.props.color == "Default" || this.props.color == "") {
              ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            } else { // if (state.color != "") {
              ctx.fillStyle = this.props.color;
            }
            ctx.fillRect(x, HEIGHT - barHeight, barWidth * this.props.width, barHeight);
    
            x += barWidth * this.props.width + 1;
          }
        }
    
        audio.play();
        // if (this.props.shape == "Square") {
    
        // } else if (state.shape == "Circle") {
        //   console.log("state = circle");
        //   renderCircle();
        // } else if (state.shape == "Triangle") {
          
        // } else if (state.shape == "Rectangle") {
          console.log("state = Rectangle");
          var barWidth = (WIDTH / bufferLength) * 2.5;
          var barHeight;
          var x = 0;
          renderRect();
        // } 
      };

    render() {
        return (
            <div className={'d-flex flex-column justify-content-center'}>
                <canvas id="canvas"></canvas>
                <audio id="audio" controls style={{width: '100%'}} className="my-3"></audio>
            </div>
        )
    }
}