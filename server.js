const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/', function (req, res) {
    // The scraping magic will happen here

    let url = "https://www.goodreturns.in/petrol-price-in-bangalore.html";
    request(url, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            var blrPrice = $('.fuel-block-details').text().split(' ').join('');
            blrPrice = blrPrice.replace(/[\n\r]+/g,"");
            // And now, the JSON format we are going to expose
            var json = {
                date: "date",
                price: blrPrice
            };
            console.log("price: " + blrPrice);
            res.set('Content-Type', 'application/json');
            res.send(json);
        }});
   
});
app.listen('8080');
console.log('API is running on http://localhost:8080');
module.exports = app;