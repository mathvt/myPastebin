let express = require('express');
let router = express.Router();
const crypto = require('crypto');
const { insertPaste, searchPaste } = require('../sql/sql')



router.get('/', function(req, res) {
  res.render('index', {title: 'pastebin'})
});


router.post('/', async function(req, res) {
  const data = req.body
  if (!data.main){
    return res.send('0')
  }
  else{
    await dataPreprocess(data)
    await insertPaste(data)
    .catch(err => err.errno !== 19 && console.error(err))
    // errno 19 = try to insert a hash already in the db
    res.type('html')
    res.send(data.hash)    
  }
});


router.get('/:id', async function(req, res) {
  let hash = req.originalUrl.replace('/', '')
  let row = await searchPaste(hash)
  if(row){
    res.render('template', {row, title: row.name})
  }
  else{
    res.sendStatus(404)
  }
});


module.exports = router


async function dataPreprocess(data){
  data.time = THEdate()
  data.expiration = expirationNumber(data.expiration);
  data.hash = sha1(data.main + data.name)
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