const itemParams = {
    TableName: 'Images',
    Item: {
      'id': { N: '1' },            // Number (id)
      'name': { S: 'example.jpg' },// String (name)
      'url': { S: 'https://example.com/example.jpg' } // String (url)
    }
  };
  
  dynamodb.putItem(itemParams, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
  