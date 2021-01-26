import locations from './store/location.js';

locations.init().then(res => {
  console.log(res);
  console.log(locations);
  console.log(locations.getCitiesByCountryCode('PE'));

});