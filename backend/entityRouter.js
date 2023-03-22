const Router = require('express');
const router = new Router();
const controller = require('./entityController');

router.delete('/delete/:name/:id', controller.deleteObject);
router.post('/add/:name', controller.addObject);

module.exports = router;