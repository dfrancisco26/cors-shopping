const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Item = require('../models/Item');

module.exports = Router()

// TO DO - implement items CRUD

  .get('/', [authenticate], async (req, res, next) => {
    try {
      const items = await Item.getAll();
      console.log(req.body);
      res.json(items);
    } catch(e) {
      next(e);
    }
  })

  .post('/', [authenticate], async (req, res, next) => {
    try {
    //   console.log(req.body);
    //   console.log(req.user);
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch(e) {
      next(e);
    }
  });
