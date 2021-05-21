let express = require('express');
let router = express.Router();
const { listPaste } = require('../sql/sql')



router.get('/', async function(req, res) {
  let list = await listPaste()
  let time = Date.now()
  list = list.filter((row) => row.timeOfExpiration > time || row.timeOfExpiration === null)
  res.render('list', {list, title: 'list'})
  })



module.exports = router