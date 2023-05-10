import config from "../conf/index.js";

const reservationPage = `${config.backendEndpoint}/reservations/`;
//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const reservations = await fetch(reservationPage);
    if (!reservations.ok){
      throw new Error("No reservation found!");
    }
    const reservationData = await reservations.json();
    console.log(reservationData);
    return reservationData;
  }
  catch(error){
    console.log(error);
    return null;
  }

  

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
/////  reservations?document.getElementById("reservation-table-parent").style = "block": document.getElementById("no-reservation-banner").style.display = "block";
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
    const reservationTable = document.querySelector("#reservation-table");
    const noReservationBanner = document.querySelector("#no-reservation-banner");
    const reservationTableParent = document.querySelector("#reservation-table-parent");
  
    if (!reservations || reservations.length == 0) {
      noReservationBanner.style.display = "block";
      reservationTableParent.style.display = "none";
    } else {
      noReservationBanner.style.display = "none";
      reservationTableParent.style.display = "block";
    }
  
    reservations.forEach((reservation) => {
      const row = reservationTable.insertRow();
      const transactionId = row.insertCell();
      const bookingName = row.insertCell();
      const adventure = row.insertCell();
      const persons = row.insertCell();
      const date = row.insertCell();
      const price = row.insertCell();
      const bookingTime = row.insertCell();
      const action = row.insertCell();
  
      transactionId.innerHTML = `<strong>${reservation.id}</strong>`;
      bookingName.textContent = reservation.name;
      adventure.textContent = reservation.adventureName;
      persons.textContent = reservation.person;
  
      const reservationDate = new Date(reservation.date);
      const formattedDate = reservationDate.toLocaleDateString("en-IN");
      date.textContent = formattedDate;
  
      price.textContent = reservation.price;
  
      const reservationTime = new Date(reservation.time);
      const formattedTime = reservationTime.toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).replace("at", ',').replace(" ,", ",");
      bookingTime.textContent = formattedTime;
  
      const visitButton = document.createElement("a");
      visitButton.setAttribute("class","reservation-visit-button");
      visitButton.setAttribute("id", reservation.id)
      visitButton.href = `../detail/?adventure=${reservation.adventure}`;
      visitButton.textContent = "Visit Adventure";
      action.appendChild(visitButton);

      const hrefLink = document.createElement("a");
      hrefLink.href = visitButton.href;
      visitButton.appendChild(hrefLink);

    //   console.log('element ID:', reservation.adventure);
    // console.log('element:', document.getElementById(reservation.id));
    // console.log('children:', document.getElementById(reservation.id).children);
    // console.log('href:', document.getElementById(reservation.id).children[0].href);
    });
    

}

export { fetchReservations, addReservationToTable };
