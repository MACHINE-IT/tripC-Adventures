
import config from "../conf/index.js";

const homePage = config.backendEndpoint;

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const city = new URLSearchParams(search).get('city');
  return city;
//implemented
}
//done
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const adventures = await fetch(`${homePage}/adventures?city=${city}`)
    if(!adventures.ok){
      throw new Error('Sorry for unexpected error!');
    }
    const data = await adventures.json();
    console.log(data);
    return data;
  }
  catch(e){
    console.log(e);
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const parentComponent = document.getElementById("data");

    // if(!adventures.length){
    //   const div = document.createElement("div");
    //   div.innerHTML = `<h4>"Sorry !! No adventures at this Filter. Select a different one"</h4>`
    //   parentComponent.appendChild(div);
    // }else{
      adventures.forEach((item) => {
      const div = document.createElement("div");
      div.setAttribute('class','col-6 col-lg-3 mb-3 position relative');
      div.innerHTML = `
        <a href="detail/?adventure=${item.id}" id="${item.id}">
          <div class="activity-card">
            <div class="category-banner me-0">${item.category}</div>
            <img src="${item.image}" class="img-responsive" alt="..." />
            <div class="activity-card-text text-md-center w-100 mt-3">
            <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
              <h6 class="text-left">${item.name}</h6>
              <p class="card-text">₹ ${item.costPerHead}</p>
            </div>
            <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
              <h6 class="text-left">Duration</h6>
              <p class="card-text">${item.duration} hours</p>
            </div>
            </div>
          </div>
        </a>
      `;
      parentComponent.appendChild(div);
    });
 // }
  
   
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredDuration = list.filter(category => category.duration>=low && category.duration<=high);
  console.log("low: "+low+" high: "+high); 
  return filteredDuration;
  
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  const filteredCategories = list.filter((adventure) => {
      return categoryList.includes(adventure.category);
    })

  return filteredCategories;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //   console.log("filters: "+filters[0]);
  let filteredList = [...list];

  if(filters.duration){
    const [low, high] = filters.duration.split('-').map(val => parseInt(val));
    console.log("low: "+low+" high: "+high);
    filteredList = filterByDuration(list, low, high); 
  }
   
  if(filters.category?.length){
    filteredList = filterByCategory(filteredList, filters.category);
  }
    
  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filtersObj = localStorage.getItem('filters');
  if(filtersObj){
    return JSON.parse(filtersObj);
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const parentCategoryList = document.getElementById('category-list');
  filters.category.forEach((category) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'category-filter');
    div.innerHTML = `<div>${category}</div>`;

    parentCategoryList.appendChild(div);
    
    // const cancelCategoryDiv = document.createElement('div');
    // cancelCategoryDiv.setAttribute('id', 'cancel-category-filter');
    // cancelCategoryDiv.textContent = 'X';

    // parentCategoryList.appendChild(cancelCategoryDiv);

  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
