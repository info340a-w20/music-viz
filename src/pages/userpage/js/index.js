'use strict';

let state = {addSongText:'',
    searchSongText:'',
    songNumber:2, 
    songList: [{name:'Good things', artist:'Gavin Koman', preview:'https://cdns-preview-8.dzcdn.net/stream/c-81af51bb89fd01fa5c65470b6b38597e-4.mp3'}, {name:'In the Midst', artist:'Tom Misch', preview: 'https://cdns-preview-3.dzcdn.net/stream/c-3b6d163c64ce90ddf249f755a7608f1b-2.mp3'}],
    searchList: [],
    data: []};

function querySong(query) {
    // let baseUrl = 'https://polar-falls-56753.herokuapp.com'
    console.log('fetch')
    let songSearch = fetch('https://polar-falls-56753.herokuapp.com/?search=' + query)
    .then((resp) => resp.json())
    .then((data) => {
        let songList = [];
        let length = data.data.length;
        if (length > 10) {
            length = 10;
        }

        for (let i = 0; i < length; i++) {
            let songInfo = {};
            songInfo.name = data.data[i].title;
            songInfo.artist = data.data[i].artist.name;
            songInfo.preview = data.data[i].preview;
            songList.push(songInfo);
        }
        state.searchList = songList;
        createSearchTable();
    }).catch(err => console.error(err));
}



    addSongList();

    // update songNumber
    let button = document.querySelector("#btn-add-song");

    let oRows = document.querySelector('table').getElementsByTagName('tr');
    let iRowCount = oRows.length;
    state.songNumber = iRowCount; // Exclude header

    if (state.addSongText.length == 0) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }


function renderSearchTable() {
    let songTable = document.querySelector(".wrapper-tbl");
    let searchTable = document.querySelector("#search-table")
    if (state.addSongText.length > 0) {
        songTable.style.display = "none";
        searchTable.style.display = "block";
    } else {
        songTable.style.display = "block";
        searchTable.style.display = "none";
    }
}


let input = document.querySelector('#search-add-song');
    input.addEventListener('keyup', function() {
        state.addSongText = this.value;

        if (state.addSongText.length == 0) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    })

// create table
input.addEventListener('keypress', (element) => {
    if (element.key === 'Enter') {
        let songTable = document.querySelector(".wrapper-tbl");
        let searchTable = document.querySelector("#search-table");
        element.preventDefault();
        if (state.addSongText.length == 0) {
            songTable.style.display = "block";
            searchTable.style.display = "none";
            return false;
        }
        
        songTable.style.display = "none";
        searchTable.style.display = "block";
        clearSearchTable();
        querySong(input.value);
    }
})

button.addEventListener('click', ()=>{
    let songTable = document.querySelector(".wrapper-tbl");
    let searchTable = document.querySelector("#search-table");
    if (state.addSongText.length == 0) {
        songTable.style.display = "block";
        searchTable.style.display = "none";
        return false;
    }
    
    songTable.style.display = "none";
    searchTable.style.display = "block";
    clearSearchTable();
    querySong(input.value);
})



    function updateTableNumber() { // Updating #
        let table = document.querySelector('table');
        for (let i = 1, row; row = table.rows[i]; i++) {
            row.cells[0].innerHTML = i;
        }
    }

    function renderSong(songName, artistName, preview) {
        let table = document.querySelector('table');
        let row = table.insertRow(1);

        let firstCell = row.insertCell(0);
        let secondCell = row.insertCell(1);
        let thirdCell = row.insertCell(2);
        let fourthCell = row.insertCell(3);
        let playCell = row.insertCell(4);

        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-play-circle', 'fa-3x');
        let playButton = document.createElement("button");
        playButton.textContent = "play"
        icon.addEventListener("click", function() {
            let player = document.querySelector("#player");
            if (!player.paused && this.classList.contains("fa-pause-circle")) {
                player.pause();
                // this.textContent = "play"
                this.classList.remove('fa-pause-circle')
                this.classList.add('fa-play-circle')
            } else {
                player.src = preview;   
                player.play();
                this.classList.remove('fa-play-circle')
                this.classList.add('fa-pause-circle')
            }
        })
        playCell.append(icon)
        firstCell.innerHTML = "1";
        secondCell.innerHTML = songName;
        thirdCell.innerHTML = artistName;
        let heart = document.createElement('i');
        heart.classList.add("fa", "fa-heart");
        fourthCell.appendChild(heart);
        state.addSongText = '';
        updateTableNumber();
    }

    function addSongList() {
        state.songList.forEach(element => {
            renderSong(element.name, element.artist, element.preview)
        });
    }


    function addSearchTable(name, artist, preview, song) {
        let table = document.querySelector('#search-table table');
        let row = table.insertRow(1);
        let firstCell = row.insertCell(0);
        let secondCell = row.insertCell(1);
        let thirdCell = row.insertCell(2);
        let fourthCell = row.insertCell(3);
        let addSongToPlaylist = row.insertCell(4);
        let addButton = document.createElement("i");
        addButton.classList.add('fa', 'fa-plus-circle', 'fa-3x')
        addButton.addEventListener("click", function() {
            state.songList.push(song);
            this.classList.add('add-btn-color');
        });
        addSongToPlaylist.appendChild(addButton);
        secondCell.innerHTML = name;
        thirdCell.innerHTML = artist;
        let playButton = document.createElement("button");
        let icon = document.createElement('i');
        icon.classList.add('fa', 'fa-play-circle', 'fa-3x');
        playButton.textContent = "play";
        icon.addEventListener("click", function() {
            let player = document.querySelector("#player");
            if (!player.paused && this.classList.contains("fa-pause-circle")) {
                player.pause();
                // this.textContent = "play"
                this.classList.remove('fa-pause-circle')
                this.classList.add('fa-play-circle')
            } else {
                player.src = preview;   
                player.play();
                this.classList.remove('fa-play-circle')
                this.classList.add('fa-pause-circle')
            }
        })
        fourthCell.append(icon)
        
        return(table);
    }

    function createSearchTable() {    
        state.searchList.forEach(element => {
            addSearchTable(element.name, element.artist, element.preview, element)
        })
    }

    function filterSongTable() {
        let filter, table, tr, td, i, txtValue;
        filter = this.value.toUpperCase()
        table = document.querySelector('table');
        tr = table.getElementsByTagName("tr");
        
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    function clearSearchTable() {
        let table = document.querySelector('#search-table table')
        let rows = table.rows;
        let i = rows.length;
        while (--i) {
          rows[i].parentNode.removeChild(rows[i]);
          // or
          // table.deleteRow(i);
        }
    }

    function clearSongTable() {
        let table = document.querySelector('table')
        let rows = table.rows;
        let i = rows.length;
        while (--i) {
          rows[i].parentNode.removeChild(rows[i]);
        }
    }

    function clearTable() {
        let table = document.querySelector('.wrapper-tbl table')
        let rows = table.rows;
        let i = rows.length;
        while (--i) {
          rows[i].parentNode.removeChild(rows[i]);
        }
    }

    let searchInput = document.querySelector('div.search input')
    searchInput.addEventListener('input', filterSongTable)

    let songTable = document.querySelector(".wrapper-tbl");
    let searchTable = document.querySelector("#search-table");
            
    let exitSearch = document.querySelector('#search-table button');
    exitSearch.addEventListener('click', () =>{
        songTable.style.display = "block";
        searchTable.style.display = "none";
        clearTable();
        addSongList();
    })

