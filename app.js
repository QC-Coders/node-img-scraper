var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var argv = require('yargs').argv;

var searchTopic = argv.search;

var images = [];

  request('http://imgur.com/t/' + searchTopic,function(err, res, body) {
    if(!err && res.statusCode === 200) {
      var $ = cheerio.load(body);
      $('img', '.cards').each(function() {
        var img = $(this).attr('src');
        img = 'http:' + img;
        images.push(img);
      });
    }
    images.forEach(function(val,i,arr) {
      request(val).pipe(fs.createWriteStream('./imgs/img' + i +'.jpg'));
    });
  });
