import config from "../conf/index.js";

const homepage = config.backendEndpoint;
async function init() { 
  //Fetches list of all cities along with their images and descriptiondescriptiondescriptiondescription
  const cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
 // TODO: MODULE_CITIES
 // 1. Fetch cities using the Backend API and return the data
  try{
    const cities = await fetch(`${homepage}/cities`);
    if(!cities.ok){
      alert(`Error: ${response.status}`);
      throw new Error("Sorry! We could now get cities to show you.")
    }
    const details = await cities.json();
   // console.log(details);
   if (!details) {
    throw new Error("Sorry! We could not gte the cities.");
  }
    return details;
  }
  catch(e){
    console.log("There has been an error here: "+e)
    return null;
  }
  // const data = await fetch(`${homepage}/cities`)
  // data
  // .then((response) => {
  //   if (!response.ok){
  //     alert(`Error: ${response.status}`);
  //     throw new Error("Sorry! We could now get cities to show you.")
  //   }
  //   {
  //   const details = await response.json();
  //   console.log(details);
  //   return details;}
  // })
  // .catch((e) =>{
  //   console.log("There has been an error here: "+e)
  //   return null;
  // })
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // <div class="col-6 col-lg-3 mb-3">
  //   <a href="resort/">
  //     <div class="card adventure-card">
  //       <img src="../../assets/adventures/resort.jpg" class="card-img-top" alt="..." />
  //       <div class="card-body  text-center d-md-flex justify-content-between">
  //         <h5 class="card-title">Resort</h5>
  //         <p class="card-text">₹1200</p>
  //       </div>
  //     </div>
  //   </a>
  // </div>
   const cardSection = document.getElementById('data');

//   const cardDiv = document.createElement('div');
//   cardDiv.setAttribute('id', id);
//   cardDiv.setAttribute('class', 'col-6 col-lg-3 mb-3');

//   const anchor = document.createElement('a').setAttribute('href', '#');

//   const card = document.createElement('div');
//   card.setAttribute('class', 'card adventure-card');

//   const img = document.createElement('img');
//   img.setAttribute('src', image);
//   img.setAttribute('alt', `${city} ${description}`);
//   img.classList.add('card-image-top');

//   const cardBody = document.createElement('div');
//   cardBody.classList.add('card-body', 'text-center', 'd-md-flex','justify-content-between');

//   const h5 = document.createElement("h5");
//   h5.classList.add("card-title");
//   h5.textContent = city;

//   const p = document.createElement("p");
//   p.classList.add("card-text");
//   p.textContent = description;

//   cardBody.appendChild(h5);
//   cardBody.appendChild(p);

// // Append the img and cardBody elements to the card element
//   card.appendChild(img);
//   card.appendChild(cardBody);

// // Append the card element to the anchor element
//   anchor.appendChild(card);
//making changes for module 3
//again
// // Append the anchor element to the div element
//   cardDiv.appendChild(anchor);
//   cardSection.appendChild(cardDiv);
const cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', 'cardEle');
  cardDiv.setAttribute('class', 'col-6 col-lg-3 mb-3');
  cardDiv.innerHTML = `
  <a href='pages/adventures/?city=${id}' id = ${id}>
     <div class="activity-card">
       <img src=${image} />
         <h5 class="card-title">${city}</h5>
         <p class="card-text">${description}</p>
     </div>
  </a>
`;

cardSection.appendChild(cardDiv);

}

export { init, fetchCities, addCityToDOM };
