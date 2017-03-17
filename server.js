var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
    };


// var T = new Twit(config);

function pick_random_image(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/assets/' + pick_random_image(images)),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Uploading an image...');

//   T.post('media/upload', { media_data: b64content }, function (err, data, response) {
//     if (err){
//       console.log('ERROR:');
//       console.log(err);
//     }
//     else{
//       console.log('Image uploaded!');
//       console.log('Now tweeting it...');

//       T.post('statuses/update', {
//         media_ids: new Array(data.media_id_string)
//       },
//         function(err, data, response) {
//           if (err){
//             console.log('ERROR:');
//             console.log(err);
//           }
//           else{
//             console.log('Posted an image!');
//           }
//         }
//       );
//     }
//   });
}


// fs.readdir(__dirname, function(err, files) {

fs.readFile('./.glitch-assets', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  data = data.split('\n');
  var urls = [];

  for (var i = 0, j = data.length; i < j; i++){
    dataJson = JSON.parse(data[i]);
    // console.log(dataJson.url);
    // urls.push();
    console.log(data[i]);
  }
  // console.log(JSON.parse(data.join(',').replace(/,\s*$/, "")));

  // console.log(data.join(',').replace(/,\s*$/, ""));


});

return false;

fs.readdir('./', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });
    console.log(images);

  /*
    You have two options here. Either you will keep your bot running, and upload images using setInterval (see below; 10000 means '10 milliseconds', or 10 seconds), --
  */
    setInterval(function(){
      upload_random_image(images);
    }, 10000);

  /*
    Or you could use cron (code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800), in which case you just need:
  */

    // upload_random_image(images);
  }
});
