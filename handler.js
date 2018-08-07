'use strict';

// destructuring
const{ getPage, parsePage, saveRatingsToDB, deployScrapers} = require('./utils');

module.exports.scrape = (event, context, callback) => {
  // 1. fetch yelp page
  getPage(event)
  // 2. parse the page
    .then(page => parsePage(page))
  // 3. save ratings data to our db
    .then(yelpData => saveRatingsToDB(yelpData, event))
    .then(() => 
      // no arguments going into this; just want to invoke the callback
      // 1st argument for callback is null b/c there are no errors in this case
      // if there are errors, it'll skip this and go into the .catch block
      // second argument for callback will be an object
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          // message includes business name
          message: `Scraped ${event}`,
        })
      })
    )
    // just in case there is an error, we need a .catch block
    .catch(error => 
      callback(new Error(`Error scraping ${event}: ${JSON.stringify(error)}`))
    );
};

module.exports.launch_scrapers = (event, context, callback) => {
  // list of business names
  const fakeDatabaseResults = [
    "urban-light-at-lacma-los-angeles",
    "the-museum-of-contemporary-art-los-angeles",
    "the-last-bookstore-los-angeles"
  ];

  // launch a lambda for each business name
  fakeDatabaseResults.forEach(businessName => {
    deployScrapers(businessName);
  })
}