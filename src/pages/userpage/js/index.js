'use strict';




let state = {addSongText:'',
    searchSongText:'',
    songNumber:2, 
    songList: [{name:'Good things', artist:'Gavin Koman'}, {name:'In the Midst', artist:'Tom Misch'}],
    searchList: [],
    data: []};

// window.onload = function() {



    // function querySong(query) {
    //     // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
    //     console.log('fetch')
    //     let songSearch = fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' +query)
    //     .then((resp) => resp.json())
    //     .then((data) => {
    //         let songList = [];
    //         let length = data.data.length;
    //         if (length > 10) {
    //             length = 10;
    //         }

    //         for (let i = 0; i < length; i++) {
    //             let songInfo = {};
    //             songInfo.name = data.data[i].title;
    //             songInfo.artist = data.data[i].artist.name;
    //             let audio = new Audio(data.data[i].preview);
    //             songInfo.preview = audio;
    //             songList.push(songInfo);
    //         }
    //         state.searchList = songList;
    //         createSearchTable();
    //         // console.log(state.searchList);
    //     }).catch(err => console.error(err));
    // }


    function querySong(query) {
        // let baseUrl = 'https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='
        console.log('fetch')
        let songSearch = fetch('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=' +query)
        .then((resp) => resp.json())
        .then((data) => {
            // let songList = [];

            let songInfo = {};
            songInfo.name = data.data[0].title;
            songInfo.artist = data.data[0].artist.name;
            let audio = new Audio(data.data[0].preview);
            songInfo.preview = audio;
            // songList.push(songInfo);

            state.songList.push(songInfo);
            clearTable();
            addSongList();
            // createSearchTable();
            // console.log(state.searchList);
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


    // function renderSearchTable() {
    //     let songTable = document.querySelector(".wrapper-tbl");
    //     let searchTable = document.querySelector("#search-table")
    //     if (state.addSongText.length > 0) {
    //         songTable.style.display = "none";
    //         searchTable.style.display = "block";
    //     } else {
    //         songTable.style.display = "block";
    //         searchTable.style.display = "none";
    //     }
    //     let button = document.querySelector("#btn-add-song");

    //     if (state.addSongText.length == 0) {
    //         button.disabled = true;
    //     } else {
    //         button.disabled = false;
    //     }
    // }




    // console.log(createSearchTable())
    input.addEventListener('keyup', function() {
        state.addSongText = this.value;

        if (state.addSongText.length == 0) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
        // renderSearchTable();
        // createSearchTable();
        
        // Loop through all table rows, and hide those who don't match the search query

    })

    // // create table
    // input.addEventListener('keypress', (element) => {
    //     if (element.key === 'Enter') {
    //         let songTable = document.querySelector(".wrapper-tbl");
    //         let searchTable = document.querySelector("#search-table");
    //         element.preventDefault();
    //         if (state.addSongText.length == 0) {
    //             songTable.style.display = "block";
    //             searchTable.style.display = "none";
    //             return false;
    //         }
            
    //         // console.log(state.addSongText)
    //         // Query and list out all the possible songs
    //         songTable.style.display = "none";
    //         searchTable.style.display = "block";
    //         clearTable();
    //         // querySong(input.value);


    //     }
        
    // })


    input.addEventListener('keypress', (element) => {
            if (element.key === 'Enter') {
                
                element.preventDefault();
                if (state.addSongText.length == 0) {
                    return false;
                }
                querySong(state.addSongText);
                state.addSongText = '';
                input.value = state.addSongText;
                state.songNumber += 1;
                updateTableNumber();
            }
        })



    // When pressed "add song" button - add a new row to the table
    // let button = document.querySelector("#btn-add-song");

    button.addEventListener('click', () =>  {
        querySong(state.addSongText);
        state.addSongText = '';
        input.value = state.addSongText;
        state.songNumber += 1;
        updateTableNumber()
        // renderSearchTable();
    })



    // button.addEventListener('click', ()=>{
    //     if (state.addSongText.length == 0) {
    //         songTable.style.display = "block";
    //         searchTable.style.display = "none";
    //         return false;
    //     }
    //     let songTable = document.querySelector(".wrapper-tbl");
    //     let searchTable = document.querySelector("#search-table");
    //     // let input = 
        
        
    //     // console.log(state.addSongText)
    //     // Query and list out all the possible songs
    //     songTable.style.display = "none";
    //     searchTable.style.display = "block";
    //     clearTable();
    //     // querySong(input.value);
    // })



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
        // renderSearchTable();
    }

    function addSongList() {
        state.songList.forEach(element => {
            renderSong(element.name, element.artist, element.preview)
        });
    }


    function addSearchTable(name, artist, preview) {
        let table = document.querySelector('#search-table table');
        let row = table.insertRow(1);
        let firstCell = row.insertCell(0);
        let secondCell = row.insertCell(1);
        let thirdCell = row.insertCell(2);
        let fourthCell = row.insertCell(3);

        // firstCell.innerHTML = "1";
        secondCell.innerHTML = name;
        thirdCell.innerHTML = artist;
        fourthCell.innerHTML = preview

        row.addEventListener('click', ()=>{
            // console.log(this.row)
            let info = {};
            info.name = this.row[1];
            info.artist = this.row[2];
            info.preview = this.row[3];

            state.songList.push(info);
            addSongList();
            // info.preview = this[3];
        })
        
        return(table);
    }

    function createSearchTable() {    
        state.searchList.forEach(element => {
            addSearchTable(element.name, element.artist, element.preview)
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

    function clearTable() {
        let table = document.querySelector('#search-table table')
        let rows = table.rows;
        let i = rows.length;
        while (--i) {
          rows[i].parentNode.removeChild(rows[i]);
          // or
          // table.deleteRow(i);
        }
      }

    // Search own list
    let searchInput = document.querySelector('div.search input')
    searchInput.addEventListener('input', filterSongTable)

    let songTable = document.querySelector(".wrapper-tbl");
    let searchTable = document.querySelector("#search-table");
            
    let exitSearch = document.querySelector('#search-table button');
    exitSearch.addEventListener('click', () =>{
        songTable.style.display = "block";
        searchTable.style.display = "none";
    })

    // let tr = document.querySelector('#search-table tr');
    // tr.addEventListener('click', () => {
    //     let info = {};
    //     console.log(this.value);
    //     info.name = this.value;
    //     // state.songList.push(this.)
    // })

