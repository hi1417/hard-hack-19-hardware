const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.static(path.join(__dirname, 'images')));

const server = app.listen(5000, function() {
  const host = server.address().address
  const port = server.address().port

  console.log("Website listening at http://%s:%s", host, port)
});

console.log(__dirname);

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

const gcloud = require('@google-cloud/storage');
let gstorage = new gcloud.Storage();
const bucketName = 'hard-hack';

async function upload( pathway ){
  await gstorage.bucket(bucketName).upload(pathway, function(err, file){
    if (!err){
      console.log(pathway+ ' is now in your bucket.');
    } else{
      console.log('Error uploading file: ' + err);
    }
  })
}

const filepath = "out-/";
let currentCount = 0;

let readFiles = function(){

}
// while (true){
//   console.log('goodbye world')
//   fs.readdir(filepath, function(err, items){
//     console.log(items);
//     if (items.length != currentCount){
//       upload(filepath+items[currentCount]);
//       currentCount+=1;
//     }
//     console.log(currentCount);
//     sleep(500);
//   })
//   sleep(10000)
// }

// const chokidar = require('chokidar');
// const watcher = chokidar.watch('dir', {ignored: /^\./, persistent: true});
//
// watcher.on ('add', function(filepath) {console.log ('File', path, 'has been added'); })

const hound = require('hound');
watcher = hound.watch('out-/');
watcher.on('create', function(file, stats) {
  console.log(file+ ' was created.');
  upload(filepath+file);
});
