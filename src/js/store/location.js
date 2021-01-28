import api from '../services/apiService.js';

class Locations {
  constructor(api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.shortCities = {};
    this.lastSearch = {};
    this.airlines = {};
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);

    // console.log(this.cities);

    return response;
  }

  getCityCodeByKey(key) {
    // return this.cities[key].code;
    const city = Object.values(this.cities).find(
      item => item.full_name === key,
    );
    return city.code;
  }

  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, city]) => {
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;

      acc[item.code] = item;
      return acc;
    }, {})
  }

  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    // console.log('serializeCities', cities);
    return cities.reduce((acc, city) => {
      // const country_name = this.getCountryNameByCode(city.country_code);
      const country_name = this.countries[city.country_code].name;
      city.name = city.name || city.name_translations.en;
      const full_name = `${city.name}, ${country_name}`;
      acc[city.code] = { ...city, country_name, full_name, };
      return acc;
    }, {})
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }

  // getCitiesByCountryCode(code) {
  //   return this.cities.filter(city => city.country_code === code);
  // }

  async fetchTickets(params) {
    console.log('fetchTickets--RUN');
    const response = await this.api.prices(params);
    console.log('fetchTickets--resp', response);
    this.lastSearch = response.data;
  }
}

const locations = new Locations(api);

export default locations;