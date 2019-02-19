const galleryDiv = document.getElementById('gallery');


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