let express = require('express');
let router = express.Router();
const crypto = require('crypto');
const { insertPost, searchInDb } = require('../sql/test')



router.get('/', function(req, res) {
  res.render('index')
});


router.post('/', function(req, res) {
  const data = req.body
  if (!data.main){
    res.send('0')
  }
  else{
    console.log(data)
    dataPreprocess(data);
    insertPost(data)
    res.send(data.hash)    
  }
});


router.get('/:id', function(req, res) {
  let newUrl = req.originalUrl.replace('/', '')
  console.log(newUrl)
  searchInDb(newUrl, (row) => {
      row && res.render('template', {row})
      !row && res.sendStatus(404)
  })
});


module.exports = router


function dataPreprocess(data){
  data.time = THEdate()
  data.expiration = expirationNumber(data.expiration);
  data.hash = sha1(data.main)
  data.name = data.name || 'Untitled paste'
}


function expirationNumber(expiration){
  return expiration //TODO
}

function controlExpiration(){
  //TODO
}


function THEdate(){
  let d = new Date()
  let postDate = d.toLocaleString('default', { month: 'long' }) + ' ' + d.getDate() + 'th ' +  + d.getFullYear()
  return postDate
}


function sha1(input){
  let sha1 = crypto.createHash('sha1')
  return sha1.update(input).digest('hex');
}