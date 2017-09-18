// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var Promotion = require("./models/Promotion.js");

var urls = require("./models/domains.js");
var Location = require("./models/Location.js")
var request = require("request");
var cheerio = require("cheerio");
mongoose.Promise = Promise;
var app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

var path = require("path");

// app.set('view engine', 'html');
var PORT = process.env.PORT || 4000;


var databaseUri = 'mongodb://localhost/myapp2';
if (process.env.MONGODB_URI) {
  mongoose.connect('mongodb://heroku_dmq351qc:aimougmur9vm8jicoou41eiudt@ds161121.mlab.com:61121/heroku_dmq351qc');
}
else {
  mongoose.connect(databaseUri);
}
// Database configuration with mongoose
// var db = process.env.MONGODB_URI || "mongodb://localhost/myapp2";
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});





// Routes //

// app.get("/stores", function(req, res) {
//
// });


// Promotion.collection.drop();



app.get("/scrape", function(req, res) {
  var count = 1;
  // console.log(urls);


  urls.forEach(function(el) {

    request(el, function(error, response, html) {
      // console.log(this.uri)
      var hostString = this.uri.host.replace(".com", "");
      var porscheString = hostString.replace("porsche", "");
      var periodString = porscheString.replace(".", "");
      var dashString = periodString.replace("-", " ");
      var dealerString = dashString.replace("dealer", "");
      var finalLocation = dealerString.replace("www", "");

      // if (dealerString.startsWith("of") {
      //   var ofString = dealerString.replace("www", "");
      //   finalLocation = ofString.replace("of", "");
      // })
      //   finalLocation = dealerString.replace("www", "");




      var host = this.uri.host;
      var site;
      var result = {};
      var locationResult = {};
      var promosArray = [];
      var category;
      //formatting for various host strings
      if (host.startsWith("www")) {

        site = "https://" + host;

      } else {

        site = "https://www." + host;
      };


      ///use url endings to create categories
      if (el.endsWith("new/")) {
        category = "new";
      }
      else if (el.endsWith("specials/")) {
        category = "specials";
      }
      else if (el.endsWith("used/")) {
        category = "used";
      }
      else if (el.endsWith("service/")) {
        category = "service";
      }
      else if (el.endsWith("parts/")) {
        category = "parts";
      };




      var imageURL = "https://" + site.slice(12);
      // console.log (imageURL);

      var $ = cheerio.load(html);
      //grabbing each "specials" div
      $("div.specials-listing-item").each(function(i, element) {
        var image;
        var promo;
        var price;


        $("div.special-listing-item-body").each(function(i, element) {
          promo = $(this).children("p").text();
          var title = $(this).children(".special-listing-item-body-inner-top").text();

          image = $(this).prev("div.special-listing-item-image").children().attr("src");

          var location = finalLocation;
          result.site = site;
          result.promo = promo.trim();
          result.title = title.trim();
          result.location = location;
          result.image = imageURL + image;
          result.category = category;
          // console.log(result);

          // need to create if statements to cut out any random unncessary promos before they reach the DB
          var entry = new Promotion(result);

            entry.save(function(err, doc) {

              if (err) {
                // console.log(err);

              } else {

            }
          });
        });
      });
    });

  });
  res.send("done");
  console.log("doneeee")
});


/////////////////GRABS ALL DATA SUCCESSFULLY/////////////////////////
// // This will get the promotionss we scraped from the mongoDB
app.get("/promotions", function(req, res) {
  // Grab every doc in the Promotions array
  Promotion.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error// Or send the doc to the browser as a json object
      );
    } else {
      //grabbing the number of each location's promos to return to AllStores component
      // doc.forEach(function(el) {
      //
      //   if (locations.indexOf(el.location) === -1) {
      //     locations.push(el.location);
      //     var locationPromos = promoCheck(el.location);
      //
      //     }
      //   });
      res.json(doc);
    }
  });
});
///////////////////////////////////////////////////////////////////




//GRABS SPECIFIC STORES///
app.get("/promotions/:location?", function(req, res) {

  console.log
  // Grab every doc in the Promotions array
  Promotion.find({location: req.params.location}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error// Or send the doc to the browser as a json object
      );
    } else {
      console.log("****************************", doc);
      res.json(doc);
    }
  });
});

app.get("/totals", function(req, res) {
  // Grab every doc in the Promotions array
  Promotion.find({}), function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error// Or send the doc to the browser as a json object
      );
    } else {
      var locations = []
      //grabbing the number of each location's promos to return to AllStores component
      doc.forEach(function(el, newLocation) {
        console.log(el)

        if (locations.indexOf(el.location) === -1) {


        newLocation = {"name": el.location,
                        "promotions": doc.length
                      }
                      locations.push(newLocation);

          }
        });

      res.send(locations);
    }
  };
});


app.get("/fullpromo/:id?", function(req, res) {
  // Grab every doc in the Promotions array
  Promotion.findOne({_id: req.params.id}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error// Or send the doc to the browser as a json object
      );
    } else {
      res.json(doc);
    }
  });
});


// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port" + PORT);
});
