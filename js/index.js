'use strict';


let state = {
  currSong: {},
  color: "",
  shape: "",
  width: 1,
  volume: 50,
  songList: [],
  app: {}
}



window.onload = function () {
  function querySong(query) {
    // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
    let songSearch = fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' +query)
    .then((resp) => resp.json())
    .then((data) => {console.log(data)
        data.data.forEach(element=> {
            // let songInfo = {};
            // songInfo.name = element.title;
            // songInfo.artist = element.artist.name;
            // songInfo.preview = element.preview;
            // state.songList.push(songInfo);
            state.songList = data;
            state.app = new App(document.querySelector("main"), state.songList);
            state.app.render();
        })
        console.log(state.searchList);
    }).catch(err => console.error(err));
  }
  querySong("get your wish");
  // let promise = fetch('../musicData.json')
  // .then(res => res.json())
  // .then(data => {
  //   state.songList = data;
  //   state.app = new App(document.querySelector("main"), state.songList);
  //   state.app.render();
  // })
  // .catch(err => console.error(err));

  // *Visualizer render and functionality code
  // let a = new Audio("url...")
  // let a = new Audio()
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

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);
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

    audio.play();
    renderFrame();
  };

  // * add event listeners to the color input
  let colorsBtns = document.querySelectorAll(".colorPick");
  colorsBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      state.color = this.innerHTML;
    })
  });

  // * add event listenter to the width slider
  let widthSlider = document.querySelector("#widthSlider");
  widthSlider.addEventListener("input", function () {
    state.width = this.value / 10;
  });

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
          // renderCanvas(audio);
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
