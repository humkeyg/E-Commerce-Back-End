const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  Category.findAll({include: [Product]})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.get('/:id', async (req, res) => {
  Category.findOne({include: [Product], where: {id:req.params.id}})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {where: {id:req.params.id}})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.delete('/:id', async (req, res) => {
  Category.destroy({where: {id:req.params.id}})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

module.exports = router;
