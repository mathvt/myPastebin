let express = require('express');
let router = express.Router();
const { listPast } = require('../sql/sql')



router.get('/', async function(req, res) {
    let list = await listPast()
    res.render('list', {list, title: 'list'})
  });



module.exports = router