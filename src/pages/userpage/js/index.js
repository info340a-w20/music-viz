'use strict';


let state = {addSongText:'',
searchSongText:''};

// if addSong is not '' display:nonefor the class=wrapper-tbl

let input = document.querySelector('#search-add-song');
console.log(input, "hi");

function renderSearchTable() {
    let songTable = document.querySelector(".wrapper-tbl");
    if (state.addSongText.length > 0) {
        songTable.style.display = "none";
    } else {
        songTable.style.display = "block";
    }
}

input.addEventListener('input', function() {
    state.addSongText = this.value;
    renderSearchTable();
})

// When pressed "add song" button - add a new row to the table
let button = document.querySelector("#btn-add-song");

button.addEventListener('click', () =>  {
    let table = document.querySelector('table');
    let row = table.insertRow(0);
    let firstCell = row.insertCell(0);
    let secondCell = row.insertCell(1);
    let thirdCell = row.insertCell(2);
    let fourthCell = row.insertCell(3);

    firstCell.innerHTML = "1";
    secondCell.innerHTML = state.addSongText;
    thirdCell.innerHTML = "N/A";
    fourthCell.innerHTML = ""
})



// const urlBase = "http://localhost:3000/?search="





