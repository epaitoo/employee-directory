const galleryDiv = document.getElementById('gallery');
const cards = galleryDiv.getElementsByClassName('card');
const modalDiv = document.getElementById('modal-div');


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
        
            let modal = `
    
                    <div class="modal-container">
                    <div class="modal">
                        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                            <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                            <p class="modal-text">${data[i].email}</p>
                            <p class="modal-text cap">${data[i].location.city}</p>
                            <hr>
                            <p class="modal-text">${data[i].phone}</p>
                            <p class="modal-text">${data[i].location.street}, ${data[i].location.state}, ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${data[i].dob.date}</p>
                        </div>
                    </div>
                    </div>  
            `
            modalDiv.innerHTML = modal;  
            })
    
            const closeButton = document.getElementById('modal-close-btn');
            const modalContainer = document.querySelector('.modal-container');
    
            if (closeButton) {
                modalContainer.style.display = 'none';
            }
            
            
        }
}   





