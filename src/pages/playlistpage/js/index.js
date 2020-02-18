let state = {playlist: [{name: 'Good stuff', img:'https://media.pitchfork.com/photos/5ac23ab298b8787dde3c7669/1:1/w_320/Tom%20Misch:%20Geography.jpg'}],
inputName: '',
inputUrl: ''};

// Prompt add playlist name


function createForm() {
    let form = document.createElement('form');
    form.classList.add("name-form");
    let title = document.createElement('p');
    title.innerHTML = "Name";

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'name');
    input.setAttribute('placeholder', 'My Playlist...');

    let inputUrl = document.createElement('input');
    inputUrl.setAttribute('type', 'text');
    inputUrl.setAttribute('id', 'url');
    inputUrl.setAttribute('placeholder', 'Your image URL...');
    inputUrl.style.display = 'block';

    let div = document.createElement('div');
    div.classList.add('submit');
    let submit = document.createElement('button');
    let cancel = document.createElement('button');
    submit.setAttribute('type','button');
    cancel.setAttribute('type', 'button');

    submit.setAttribute('id', 'submit-button');
    cancel.setAttribute('id', 'cancel-button');

    submit.innerHTML = "Submit"
    cancel.innerHTML = 'Cancel'
    

    div.appendChild(submit);
    div.appendChild(cancel);

    form.appendChild(title);
    form.appendChild(input);
    form.appendChild(inputUrl);
    form.appendChild(div);

    let divCard = document.querySelector('.cards');
    divCard.appendChild(form)
}

let addButton = document.querySelector(".fa-plus-circle");
addButton.addEventListener('click', ()=> {
    let div = document.querySelector('#circle');
    div.style.display = 'none';
    createForm();
    let submit = document.querySelector('#submit-button');
    let cancel = document.querySelector('#cancel-button');

    let input = document.querySelector('#name');

    input.addEventListener('input', function() {
        state.inputName = this.value;
    })
    let url = document.querySelector('#url');
    url.addEventListener('input', function() {
        state.inputUrl = this.value;
    })
    let divCard = document.querySelector('.cards');

    // Click submit will create new card
    submit.addEventListener('click', ()=> {
        addCard(state.inputName, state.inputUrl);
        // console.log(divCard.lastChild)

        divCard.removeChild(divCard.lastChild);
        div.style.display = 'inline';
    })

    // click Cancel
    cancel.addEventListener('click', ()=> {
        divCard.removeChild(divCard.lastChild);
        div.style.display = 'inline';
    })
})

//https://media.pitchfork.com/photos/5ac23ab298b8787dde3c7669/1:1/w_320/Tom%20Misch:%20Geography.jpg

// Create new class element

function addCard(name, url) {
    // Parent
    let cards = document.querySelector('#my-play-list');

    let newCard = document.createElement('div');
    newCard.classList.add('card');
    let overlayer = document.createElement('div');
    overlayer.classList.add('overlayer');
    let playCircle = document.createElement('i');
    playCircle.classList.add('fa', 'fa-play-circle');
    
    overlayer.appendChild(playCircle);

    let img = document.createElement('img');
    img.setAttribute('src', url);
    let title = document.createElement('div');
    title.classList.add('title');
    let p = document.createElement('p');
    p.innerHTML = name
    title.appendChild(p);


    newCard.appendChild(overlayer);
    newCard.appendChild(img);
    newCard.appendChild(title);

    cards.insertBefore(newCard, cards.lastChild);
}


// Render playlist page;

