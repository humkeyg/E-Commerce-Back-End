const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  Tag.findAll({include: [Product, {model: Product, through: ProductTag}]})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.get('/:id', async (req, res) => {
  Tag.findOne({include: [Product, {model: Product, through: ProductTag}], where: {id:req.params.id}})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.post('/', async (req, res) => {
  Tag.create(req.body)
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.put('/:id', async (req, res) => {
  Tag.update(req.body, {where: {id:req.params.id}})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

router.delete('/:id', async (req, res) => {
  Tag.destroy({where: {id:req.params.id}})
  .then((data) => {
    res.json(data);
  }) .catch(err => {
    console.log(err)
    res.json(err);
  })
});

module.exports = router;
