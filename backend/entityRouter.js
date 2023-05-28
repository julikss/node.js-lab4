const Router = require('express');
const router = new Router();
const controller = require('./entityController');

router.delete('/api/v1/:name/:id', controller.deleteObject);
router.post('/api/v1/:name', controller.addObject);
router.get('/api/v1/:name', controller.getAllObjects);
router.get('/api/v1/:name/:id', controller.getObject);
router.put('/api/v1/:name/:id', controller.updateObject);

module.exports = router;