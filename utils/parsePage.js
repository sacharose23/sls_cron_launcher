// parsing library
const cheerio = require("cheerio");

module.exports = page => {

  //try-catch block
  // if there are any errors, it'll be caught in the catch block
  try {
    const $ = cheerio.load(page);
    // pass the page into the method load
    const rating = $(".rating-info .i-stars")
      .attr("title")
      .trim()
      .split(" ")[0];
    const reviewCount = $(".rating-info .review-count")
      .text()
      .trim()
      .split(" ")[0];
    
    const yelpData = {
      rating, 
      reviewCount
    };
    return Promise.resolve(yelpData);
  } catch(error) {
    return Promise.reject(`Error parsing page: ${JSON.stringify(error)}`);
    // use template strings
  }
}; 