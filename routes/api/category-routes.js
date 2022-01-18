const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll( {
      include: [Product]
    });
    console.log('get all categories');
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const Category = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!Category) {
      res.status(404).json(err);
      return;
    }

    res.status(200).json(Category);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(category => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log(req.params)
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(category => {
    res.status(200).json(category);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.findAll({
      where: {
        id: req.params.id
      }
    }); 
    const categoryData = await category.destroy( {
      where: {
        id: req.params.id,
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
