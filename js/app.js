const galleryDiv = document.getElementById('gallery');
const modalDiv = document.querySelector('#modal-div');


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
}   


function generateModal() {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let modal = data.results.map(employee => {
                `
                <div class="modal-container">
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
                  </div>
           </div>
      
          `
            })
            modalDiv.innerHTML = modal;
        })
}

galleryDiv.addEventListener('click', generateModal);
