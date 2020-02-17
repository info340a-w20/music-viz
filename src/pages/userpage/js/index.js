

let state = {addSongText:'',
searchSongText:''}

// if addSong is not '' display:nonefor the class=wrapper-tbl

let input = document.querySelector('#search-add-song');
console.log(input, "hi");
input.addEventListener('input', function() {
    state.addSongText = this.value;
    console.log(state.addSongText)
    renderInput();
})



// const urlBase = "http://localhost:3000/?search="





