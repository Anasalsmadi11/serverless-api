'use strict';
const dynamoose = require('dynamoose'); 

// table:
const peopleSchema = new dynamoose.Schema({
    'id': String,
    'name': String,
    'phone': String,
});

const contctsModel = dynamoose.model('people19', peopleSchema);

// lambda function
exports.handler = async (event) => {


  
    let { id, name, phone } = event.queryStringParameters; 
    let newContact = { id, name, phone };
  
    let myResponse = {
        statusCode: null,
        body: null 
    }
    try {
        let foundPerson= await contctsModel.findOne({where:{id:newContact.id}})
        let newFriend = await contctsModel.delete(foundPerson)
        myResponse.statusCode = 200;
        myResponse.body = JSON.stringify(newFriend)
    }
    catch (error) {
        myResponse.statusCode = 500;
        myResponse.body = JSON.stringify(error.message);
    }

    return myResponse;

}

