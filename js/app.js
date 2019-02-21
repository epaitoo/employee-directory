const galleryDiv = document.getElementById('gallery');
const cards = galleryDiv.getElementsByClassName('card');
const modalDiv = document.getElementById('modal-div');
const modalContainer = document.getElementsByClassName('modal-container');
const modalInfo = document.getElementsByClassName('modal-info-container');


const url = "https://randomuser.me/api/?results=12";

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
        `
    ).join("");
    galleryDiv.innerHTML = employees; 

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            let modal = data.map(data => 
                        `
                        <div class="modal-container">
                            <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                                <p class="modal-text">${data.email}</p>
                                <p class="modal-text cap">${data.location.city}</p>
                                <hr>
                                <p class="modal-text">${data.phone}</p>
                                <p class="modal-text">${data.location.street}, ${data.location.state}, ${data.location.postcode}</p>
                                <p class="modal-text">Birthday: ${data.dob.date}</p>
                            </div>
                            </div>
                        </div>
                    `
                ).join("");        
                modalDiv.innerHTML = modal; 
    
                
    
                for (let i = 0; i < modalInfo.length; i++) {
                    for (let i = 0; i < modalContainer.length; i++) {
                        modalContainer[i].style.display = 'none'; //hide all the modals
                    }
                    //compared card data with <div class="modal-info-container">
                    if (cards[i].data == modalInfo[i].data) { 
                        modalContainer[i].style.display = '';
                    } else {
                        modalContainer[i].style.display = 'none';
                    }
                }      
            })
        }
}   





