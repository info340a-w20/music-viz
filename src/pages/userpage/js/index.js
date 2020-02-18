'use strict';




let state = {addSongText:'',
    searchSongText:'',
    songNumber:2, 
    songList: [{name:'Good things', artist:'Gavin Koman'}, {name:'In the Midst', artist:'Tom Misch'}],
    searchList: [],
    data: []};

function querySong(query) {
    // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
    let songSearch = fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' +query)
    .then((resp) => resp.json())
    .then((data) => {console.log(data)
        data.data.forEach(element=> {
            let songInfo = {};
            songInfo.name = element.title;
            songInfo.artist = element.artist.name;
            songInfo.preview = element.preview;
            state.searchList.push(songInfo);
        })
        console.log(state.searchList);
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

// if addSong is not '' display:nonefor the class=wrapper-tbl
let input = document.querySelector('#search-add-song');


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
    let button = document.querySelector("#btn-add-song");

    if (state.addSongText.length == 0) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }

}


// console.log(createSearchTable())
input.addEventListener('keyup', function() {
    state.addSongText = this.value;

    if (state.addSongText.length == 0) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
    renderSearchTable();
    createSearchTable();
    let filter, table, tr, td, i, txtValue;
    filter = this.value.toUpperCase()
    table = document.querySelector('#search-table');
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

})

input.addEventListener('keypress', () => {
    
})

// When pressed "add song" button - add a new row to the table
// let button = document.querySelector("#btn-add-song");

button.addEventListener('click', () =>  {
    let table = document.querySelector('table');
    let row = table.insertRow(1);
    let firstCell = row.insertCell(0);
    let secondCell = row.insertCell(1);
    let thirdCell = row.insertCell(2);
    let fourthCell = row.insertCell(3);

    firstCell.innerHTML = "1";
    secondCell.innerHTML = state.addSongText;
    thirdCell.innerHTML = "N/A";
    let heart = document.createElement('i');
    heart.classList.add("fa", "fa-heart");
    fourthCell.appendChild(heart);
    state.addSongText = '';
    input.value = state.addSongText;
    state.songNumber += 1;
    updateTableNumber()
    renderSearchTable();
})

function updateTableNumber() { // Updating #
    let table = document.querySelector('table');
    for (let i = 1, row; row = table.rows[i]; i++) {
        row.cells[0].innerHTML = i;
    }
}


function renderSong(songName, artistName) {
    let table = document.querySelector('table');
    let row = table.insertRow(1);
    let firstCell = row.insertCell(0);
    let secondCell = row.insertCell(1);
    let thirdCell = row.insertCell(2);
    let fourthCell = row.insertCell(3);

    firstCell.innerHTML = "1";
    secondCell.innerHTML = songName;
    thirdCell.innerHTML = artistName;
    let heart = document.createElement('i');
    heart.classList.add("fa", "fa-heart");
    fourthCell.appendChild(heart);
    state.addSongText = '';
    updateTableNumber();
    renderSearchTable();
}


// const urlBase = "http://localhost:3000/?search="

function addSongList() {
   state.songList.forEach(element => {
       renderSong(element.name, element.artist)
   });
}


function addSearchTable(name, artist) {
    let table = document.querySelector('#search-table table');
    let row = table.insertRow(1);
    let firstCell = row.insertCell(0);
    let secondCell = row.insertCell(1);
    let thirdCell = row.insertCell(2);
    let fourthCell = row.insertCell(3);

    // firstCell.innerHTML = "1";
    secondCell.innerHTML = name;
    thirdCell.innerHTML = artist;
    
    return(table)
}

function createSearchTable() {    
    state.searchList.forEach(element => {
        addSearchTable(element.name, element.artist)
    })
}

function filterSearchTable() {
    // Declare variables
    
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

// Search own list
let searchInput = document.querySelector('div.search input')
searchInput.addEventListener('input', filterSongTable)

