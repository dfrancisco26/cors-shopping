const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const Item = require('../models/Item');

module.exports = Router()

// TO DO - implement items CRUD

  .get('/', [authenticate], async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
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
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const data = await Item.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
