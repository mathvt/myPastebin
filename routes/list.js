let express = require('express');
let router = express.Router();
const { listPast } = require('../sql/sql')



router.get('/', async function(req, res) {
    let list = await listPast()
    if (list.length === 0){
      list[1] = {name : 'empty'}
    }
    let time = Date.now()
    list = list.filter((row) => row.timeOfExpiration > time || row.timeOfExpiration === 0)
    res.render('list', {list, title: 'list'})
  });



module.exports = router