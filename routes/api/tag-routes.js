const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    order: [['created_at', 'DESC']],   
    attributes: [
      'id',
      'tag_name',
    ],
    include: [
    // include its associated Product data
  {
        model: ProductTag,
        attributes: ['id', 'product_id'],
        // include: {
        //   model: Category,
        //   attributes: ['id']
        //   }
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name',
    ],
    include: [
    // include its associated Product data
  {
    model: ProductTag,
        attributes: ['id', 'product_id'],   
    // model: Product,
    //     attributes: ['id', 'product_name', 'price', 'stock'],
    //     include: {
    //       model: Category,
    //       attributes: ['id']
    //       }
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
      // expects {tag_name: "1", product_id: "1", category_name: "bags"}
      Tag.create({
        tag_name: req.body.tag_name,
        product_id: req.body.product_id,
        category_name: req.body.category_name
      })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  // expects {DATA: 'here!'}
  
    // pass in req.body instead to only update what's passed through
    Tag.update(req.body, {
      // individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
