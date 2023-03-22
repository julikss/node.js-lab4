const Router = require('express');
const router = new Router();
const controller = require('./booksController');

router.post('/add', controller.addBook);
router.delete('/delete/:id', controller.deleteBook);
router.post('/edit/:id', controller.editBook);
router.get('/allbooks', controller.allBooks);

module.exports = router;