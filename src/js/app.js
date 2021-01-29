import '../css/style.css';
import './plugins';
import locations from './store/location.js';
import formUI from './views/form.js';
import currencyUI from './views/currency.js';
import ticketsUI from './views/tickets.js';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;

  // Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onFormSubmit();
  })

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // console.log('onFormSubmit--RUN');

    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    // console.log('onFormSubmit', origin, destination, depart_date, return_date, currency);

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
})

