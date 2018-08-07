const uuid = require("uuid");
const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = (yelpData, businessName) => {
  // inserts this data into the DB
  const date = JSON.stringify(new Date());
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      // object that we will insert into the DB
      id: uuid.v1(),
      businessName: businessName,
      reviewCount: yelpData.reviewCount,
      rating: yelpData.rating,
      scrapedAt: date
    }
  };
  console.log(params);
  // 
  dynamoDB.put(params, error => {
    if(error) {
      console.error(`Error saving data to DynamoDB: ${JSON.stringify(error)}`);
      return Promise.reject(
        `Error saving data to DynamoDB: ${JSON.stringify(error)}`
      );
    } else {
      return Promise.resolve(params.Item);
    }
  })
};