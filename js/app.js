const searchDiv = document.querySelector('.search-container');
const galleryDiv = document.getElementById('gallery');
const cards = galleryDiv.getElementsByClassName('card');
const modalContainer = document.getElementsByClassName('modal-container');
const closeButton = document.getElementsByClassName('modal-close-btn');
const prevButton = document.getElementsByClassName('modal-prev btn');
const nextButton = document.getElementsByClassName('modal-next btn');


const url = "https://randomuser.me/api/?results=12&nat=us,fr,gb,ca,nz";

fetch(url)
    .then(response => response.json())
    .then(data => generateEmployees(data.results))
    .catch(error => console.log(error))


function generateEmployees(data) {
    let employees = data.map(employee =>  `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
             </div> 
        </div> 

        <div class="modal-container" style="display:none">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                    <p class="modal-text">${employee.email}</p>
                    <p class="modal-text cap">${employee.location.city}</p>
                    <hr>
                    <p class="modal-text">${employee.phone}</p>
                    <p class="modal-text">${employee.location.street}, ${employee.location.state}, ${employee.location.postcode}</p>
                <p class="modal-text">Birthday: ${employee.dob.date}</p>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        </div>  
        `
    ).join("");
    galleryDiv.innerHTML = employees; 


    //search feature
    let searchHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `
    searchDiv.innerHTML = searchHTML;

    //event listener to display search card on keyUp event
    const searchBar = document.querySelector('#search-input');
    searchBar.addEventListener('keyup', function(e){
        const searchTerm = e.target.value.toLowerCase()
        const cardInfo = document.getElementsByClassName('card-info-container');
        let cardInfoArr = Array.from(cardInfo);
        cardInfoArr.forEach(function(element) {
            const cardName = element.firstElementChild.textContent;
            if (cardName.toLowerCase().indexOf(searchTerm) != -1) {
                element.parentElement.style.display = '';
            } else {
                element.parentElement.style.display = 'none';        
            }
        })
    });


     //event listener to display card on click
     for (let i = 0; i < cards.length; i++) { 
        cards[i].addEventListener('click', function() {
            if (cards[i]) {
                modalContainer[i].style.display = '';
            } else {
                modalContainer[i].style.display = 'none';
            }   
        })

    }

    //event listener to close a card on card
    for (let i = 0; i < closeButton.length; i++) {
    closeButton[i].addEventListener('click', () => {
            if (closeButton[i]) {
                    modalContainer[i].style.display = 'none'; 
            }
        })
    }

        //event listener to show a prev card when previous button is clicked
    for (let i = 0; i < prevButton.length; i++) {
        prevButton[i].addEventListener('click', function(){
            let len = modalContainer.length;
            let prevModal = modalContainer[(i+len-1)%len];
        
            if (prevButton) {
                modalContainer[i].style.display = 'none'; 
                prevModal.style.display = '';
        
            } else {
                prevModal.style.display = 'none';
            }
        })
    }

    //event listener to show next card when next button is clicked
    for (let i = 0; i < nextButton.length; i++) {
        nextButton[i].addEventListener('click', function() {
            let len = modalContainer.length;
            let prevModal = modalContainer[(i+len-1)%len];
            let nextModal = modalContainer[(i+1)%len];

            if (nextButton) {
                modalContainer[i].style.display = 'none'; 
                nextModal.style.display = '';
                prevModal.style.display = 'none';
            } else {
                nextModal.style.display = 'none';

            }
        })

    }
   
}   





