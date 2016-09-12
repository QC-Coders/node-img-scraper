var request = require('request');

request('http://imgur.com/t/javascript', function(err, res, body) {
  if(!err && res.statusCode === 200) {
    console.log(body);
  }
});
