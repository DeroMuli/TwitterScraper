var request = require('request');
const fs = require('fs');

var options = {
  method: 'GET',
  url : 'https://hekayaent.co.ke/vid/',
  qs : {
    query : "Leicester video Goal"
  } 
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  let data = JSON.parse(response.body);
  if(data.url){
    console.log(data.url)
    console.log(data.text)
  }
  else{
    console.log(data)
  }
})