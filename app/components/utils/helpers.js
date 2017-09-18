import axios from 'axios';

var helper = {

  runScrape: function() {
    return axios.get("/scrape");
  },

  getLocation: function(location) {
    console.log(location)
    return axios.get("/promotions/" + location)
  },

  getPromotions: function() {

    return axios.get("/promotions")
    // .then(function(promotions) {
    //   console.log(promotions)
      // var promos = promotions.data
      // promos.forEach(function(el, allLocations) {
      //
      //   if (locations.indexOf(el.location) === -1) {
      //     var newLocation = el
      //     return axios.get("/totals/" + el.location).then(function(locationData) {
      //       console.log("location data", locationData)
      //       locations.push({"location": el.location,
      //                       "total": locationData.data.length
      //                     })
      //     })
      //
      //     }
      //     return locations
      //     })


        // })

  },

  getTotals: function(promos) {
    return axios.get("/totals")
  }



};

module.exports = helper;
