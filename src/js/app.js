import "../css/style.css";
import "./plugins";
import locations from "./store/location.js";
import { allFavorites } from "./store/favorites.js";
import formUI from "./views/form.js";
import currencyUI from "./views/currency.js";
import ticketsUI from "./views/tickets.js";
import favoriteTicketsUI from "./views/favorites.js";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  let ticketId = 0;

  // Elements
  const form = formUI.form;
  const favoriteButton = document.getElementById("favorite");
  const listContainer = document.querySelector(
    ".tickets-sections .container .row"
  );

  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  favoriteButton.addEventListener("click", showFavoritesTickets);
  listContainer.addEventListener("click", addIntoFavoritesList);

  // Handlers
  function addIntoFavoritesList({ target }) {
    if (target.classList.contains("add-favorite")) {
      const parent = target.closest("[id]");
      this.ticketId = parent.dataset.ticketsId;
    }

    const arrOfTickets = locations.lastSearch;
    const selectedCard = arrOfTickets[this.ticketId];

    allFavorites.push(selectedCard);
  }

  function showFavoritesTickets() {
    favoriteTicketsUI.renderFavoriteTickets(allFavorites);
  }

  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
    console.log(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
