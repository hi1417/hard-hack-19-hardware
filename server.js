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

let filepath = "out-/"
fs.readdir(filepath, function(err, items){
  console.log(items);
  for (var i=0; i<items.length; i++){
    console.log(items[i]);
    upload(filepath+items[i]);
  }
})
// upload();
