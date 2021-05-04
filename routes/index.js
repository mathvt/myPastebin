let express = require('express');
let router = express.Router();
let fs = require('fs')
const crypto = require('crypto');
const { send } = require('process');


router.get('/:id', function(req, res) {
  res.sendFile('C:/Users/mathieu/Desktop/project/pastebin/public/texts/' + req.originalUrl + '.html');
});


router.post('/', function(req, res) {
  let data = req.body
  console.log(data)
  fileName = createHTML(data);
  res.send(fileName)
});



module.exports = router




function createHTML(data){
  let time = THEdate()
  let html = fs.readFileSync('./views/template.html', 'utf-8',err => console.error(err))
  let title = data.name || 'Untitled paste'
  html = html.replace('replace_title', title)
  html = html.replace('replace_time', time)
  html = html.replace('replace_main', data.main)
  let fileName = sha1(data.main)
  fs.writeFileSync('./public/texts/' + fileName +'.html', html)
  return fileName
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