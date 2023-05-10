import config from "../conf/index.js";
const homePage = config.backendEndpoint;
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // const adventureID = new URLSearchParams(search).get('adventure');
  // if (adventureID){
  //   return adventureID;
  // }
  // // Place holder for functionality to work in the Stubs
  // return null;
  try {
    const param = new URLSearchParams(search).get("adventure");
    return param;
  } catch (error) {
    return null;
  }
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const adventureDetailsFetch = await fetch(`${homePage}/adventures/detail?adventure=${adventureId}`);
    if (!adventureDetailsFetch.ok){
      throw new Error("Sorry for the inconvience!")
    }
      const adventureDetails = await adventureDetailsFetch.json()
      return adventureDetails;
  }
  catch(e){
    console.log(e);
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").innerHTML=`${adventure.name}`;
  document.getElementById('adventure-subtitle').innerHTML=`${adventure.subtitle}`;
  const imageComponent = document.getElementById("photo-gallery");

  adventure.images.forEach((image) => {
    const div = document.createElement('div');
    div.innerHTML = 
    `<img src=${image} class="activity-card-image" alt="image of adventure ${adventure.names}">`;
    imageComponent.appendChild(div);
  });

  document.getElementById("adventure-content").innerHTML = `${adventure.content}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log("images = "+ images)
  console.log("images = "+ images[0])
  const imageCarousal = document.getElementById("photo-gallery");
  // Create the carousel component
  const carousel = document.createElement("div");
  carousel.setAttribute("id", "carouselExampleIndicators");
  carousel.setAttribute("class", "carousel slide");
  carousel.setAttribute("data-bs-ride", "carousel");

  const carouselIndicators = document.createElement('div');
  carouselIndicators.setAttribute("class", "carousel-indicators")

  for (let i=0; i<images.length; i++){
    if(i==0){
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i}"></button>`;
    }
    else {
     carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`;
    }
   }; 
   carousel.appendChild(carouselIndicators);

  const carousalInner = document.createElement("div");
  carousalInner.setAttribute("class", "carousel-inner")

  carousel.appendChild(carousalInner);

  for (let i=0; i<images.length; i++){
   const div = document.createElement("div");
   if(i==0){
    div.setAttribute("class", "carousel-item active")
   }
   else {
    div.setAttribute("class", "carousel-item");
   }
   div.innerHTML = `
   <img src=${images[i]} class="d-block w-100">
   `;
   carousalInner.appendChild(div);
  };  
  // Append the carousel component to the photo-gallery element
  imageCarousal.innerHTML = '';
  imageCarousal.appendChild(carousel);

  const carouselControlPrevButton = document.createElement('button');
  carouselControlPrevButton.setAttribute("class", "carousel-control-prev");
  carouselControlPrevButton.setAttribute("type", "button");
  carouselControlPrevButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlPrevButton.setAttribute("data-bs-slide", "prev");
  carouselControlPrevButton.innerHTML = 
  `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
  `;
  carousel.appendChild(carouselControlPrevButton);

  const carouselControlNextButton = document.createElement('button');
  carouselControlNextButton.setAttribute("class", "carousel-control-next");
  carouselControlNextButton.setAttribute("type", "button");
  carouselControlNextButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlNextButton.setAttribute("data-bs-slide", "next");
  carouselControlNextButton.innerHTML = 
  `<span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
  `;
  carousel.appendChild(carouselControlNextButton);

//   <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
//   <div class="carousel-inner">
    
//     <div class="carousel-item active">
//       <img src="..." class="d-block w-100" alt="...">
//     </div>
//   </div>
// </div>


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure)
  if(adventure.available){
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = `${adventure.costPerHead}`;

  }
  else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
    
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = `${totalCost}`;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", formSubmit);
  async function formSubmit(event){
    event.preventDefault();
    let formElements = form.elements;

    // const name = form.querySelector('input[name="name"]').value;
    // const date = form.querySelector('input[name="date"]').value;
    // const person = form.querySelector('input[name="person"]').value;

    const dataToPostFromForm = {
      name: formElements["name"].value.trim(),
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    }

    console.log(dataToPostFromForm)
  
    try {
      const postResponse = await fetch(`${homePage}/reservations/new`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPostFromForm)
      });
      console.log(postResponse);
      if(postResponse.ok){
        alert("Success!");
      }else {
        alert("Failed!");
      }
    } catch (error) {
      console.log(error)
      alert("Failed!");
    }
  
      
                
    // let options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     },
    //   body: JSON.stringify(dataToPostFromForm)
    // }

    // console.log(options);

    // const response = await fetch(`${config.backendEndpoint}/reservations/new`, options)
    // if(response.ok){
    //   alert('Success');
    // }
    // else
    //   alert('Failed');
    // }
  
  
}

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const banner = document.getElementById("reserved-banner");
  adventure.reserved? banner.style.display = "block": banner.style.display = "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
