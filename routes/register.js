var express = require('express');
var router = express.Router();
var db = require('../models/index');

/* POST register listing. */
router.post('/', async function (req, res) {
  try {
    const users = await db.User.create({ name: 'Jonathan', age: 24 });
    res.sendSuccess(users);
  } catch (error) {
    res.status(500).sendError(error)
  }
});

router.get('/', async function (req, res) {
  try {
    const users = db.getModel('User');
    res.sendSuccess(await users.findAll());
  } catch (error) {
    res.status(500).sendError(error)
  }
});

module.exports = router;
