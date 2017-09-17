var fs = require('fs'),
    path = require('path'),
    request = require('request'),
    helpers = require(__dirname + '/helpers.js');


module.exports = {
  random_from_array: function(arr) {
    return arr[Math.floor(Math.random()*arr.length)]; 
  },
  get_random_int: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  load_images: function(data){
    console.log('reading assets folder...')
    /* Load images from the assets folder */
    data = data.split('\n');
    var urls = [];

    for (var i = 0, j = data.length; i < j; i++){
      if (data[i].length){
        var url = JSON.parse(data[i]).url,
            file_name = this.get_filename_from_url(url).split('%2F')[1];
        console.log(`- ${file_name}`);
        if (url && this.extension_check(url)){
          urls.push(url);
        }
      }
    }
    return urls;
  },
  extension_check: function(url) {
    var extName = path.extname(url).toLowerCase();
    return extName === ".png" || extName === ".jpg" || extName === ".jpeg";
  },
  get_filename_from_url: function(url) {
    return url.substring(url.lastIndexOf('/') + 1);
  },
  upload_random_image_remote: function(urls, cb) {
    console.log('loading remote image...');
    request({url: this.random_from_array(urls), encoding: null}, function (err, res, body) {
        if (!err && res.statusCode == 200) {
          var b64content = 'data:' + res.headers['content-type'] + ';base64,';
          console.log('image loaded...');
          cb(null, body.toString('base64'));           
        } else {
          console.log('ERROR:', err);
          cb(err);
        }
    });
  },  
};
