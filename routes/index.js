let express = require('express');
let router = express.Router();
let fs = require('fs')



router.get('/:id', function(req, res) {
  res.sendFile('C:/Users/mathieu/Desktop/project/pastebin/public/texts' + req.originalUrl + '.html');
});


router.post('/', function(req, res) {
  let data = req.body
  console.log(data)
  createHTML(data);
  res.sendStatus(204)
});



module.exports = router




function createHTML(data){
  let time = THEdate()
  let html = fs.readFileSync('./views/template.html', 'utf-8',err => console.error(err))
  html = html.replace('replace_title', data.name)
  html = html.replace('replace_time', time)
  html = html.replace('replace_main', data.main)
  fs.writeFileSync('./public/texts/' + data.name +'.html', html)
}


function THEdate(){
  let d = new Date()
  let postDate = d.toLocaleString('default', { month: 'long' }) + ' ' + d.getDate() + 'th ' +  + d.getFullYear()
  return postDate
}