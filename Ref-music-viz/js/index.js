'use strict';


let state = {
  currSong: {},
  color: "",
  shape: "Circle",
  width: 1,
  volume: 50,
  songList: [],
  app: {}
}



window.onload = function() {
  function querySong(query) {
    // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
    let songSearch = fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' +query)
    .then((resp) => resp.json())
    .then((data) => {console.log(data)
        data.data.forEach(element=> {
            state.songList = data;
            state.app = new App(document.querySelector("main"), state.songList);
            state.app.render();
        })
    }).catch(err => console.error(err));
  }
  querySong("get your wish");

  // * Visualizer render and functionality code
  var file = document.getElementById("thefile");

  file.onchange = function () {
    var audio = document.getElementById("audio");

    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);

    renderCanvas();
  };

  function renderCanvas() {
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

        if (state.color == "Default" || state.color == "") {
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        } else { // if (state.color != "") {
          ctx.fillStyle = state.color;
        }
        ctx.fillRect(x, HEIGHT - barHeight, barWidth * state.width, barHeight);

        x += barWidth * state.width + 1;
      }
    }

    function renderCircle() {
      // find the center of the window
      let center_x = canvas.width / 2;
      let center_y = canvas.height / 2;
      let radius = 150;

      // style the background
      // var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
      // gradient.addColorStop(0,"rgba(0, 0, 0)");
      // gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      //draw a circle
      ctx.beginPath();
      ctx.arc(center_x,center_y,radius,0,2*Math.PI);
      ctx.stroke();
      let bars = 95;
    
      analyser.getByteFrequencyData(dataArray);
      for(var i = 0; i < bars; i++){
        
        //divide a circle into equal parts
        let rads = Math.PI * 2 / bars;
        
        let bar_height = dataArray[i]*0.7;
        let bar_width = state.width * 5;
        
        // set coordinates
        let x = center_x + Math.cos(rads * i) * (radius);
	      let y = center_y + Math.sin(rads * i) * (radius);
        let x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
        let y_end = center_y + Math.sin(rads * i)*(radius + bar_height);
        
        //draw a bar
        drawBar(x, y, x_end, y_end, bar_width,dataArray[i]);
    
      }
    window.requestAnimationFrame(renderCircle);
    }

    // for drawing a bar
    function drawBar(x1, y1, x2, y2, width,frequency){
    
      var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
      if (state.color == "") {
        ctx.strokeStyle = lineColor;
      } else {
        ctx.strokeStyle = state.color;
      }
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x1,y1);
      ctx.lineTo(x2,y2);
      ctx.stroke();
    }

    audio.play();
    if (state.shape == "Square") {

    } else if (state.shape == "Circle") {
      console.log("state = circle");
      renderCircle();
    } else if (state.shape == "Triangle") {
      
    } else if (state.shape == "Rectangle") {
      console.log("state = Rectangle");
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
      renderRect();
    } 
  };

  // * add event listeners to the color input
  let colorsBtns = document.querySelectorAll(".colorPick");
  colorsBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.color = this.innerHTML;
    })
  });

  // * add event listener to the width slider
  let widthSlider = document.querySelector("#widthSlider");
  widthSlider.addEventListener("input", function () {
    state.width = this.value / 10;
  });

  // * add event listener to the shape input
  let shapeBtns = document.querySelectorAll(".shapePick");
  shapeBtns.forEach(function (btn) {
    btn.addEventListener("click", function() {
      state.shape = this.innerHTML;
      renderCanvas();
    })
  })
  class App {
    constructor(parent, songList) {
      this.parent = parent;
      this.songList = songList;
    }
  
    render() {
      // this.songList.data.forEach(song => {
      //   console.log(song);
      // });
      for (let i = 0; i < 10; i++) {
        let item = this.songList.data[i];
  
        let card = document.createElement("a");
        card.classList.add("card", "m-2");
        card.target = "_blank";
        card.addEventListener("click", function() {
          var audio = document.getElementById("audio");
          audio.src = item.preview;
          renderCanvas();
        })
  
        // let wrapper = document.createElement("div");
        // wrapper.style.width = "10rem";
        // wrapper.style.textOverflow = "ellipses";
        // card.appendChild(wrapper);
  
        let title = document.createElement("h4");
        title.innerHTML = item.title;
        title.classList.add("ml-2");
        card.appendChild(title);
  
  
  
        let author = document.createElement("p");
        author.innerHTML = "by " + item.artist.name;
        author.classList.add("song-author", "ml-3");
        card.appendChild(author);
  
        document.querySelector("#song-list").appendChild(card);
      }
    }
  }
};
