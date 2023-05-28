const express = require('express');
const app = express();
const port = 8000;
const entityRouter = require('./entityRouter');
const booksRouter = require('./booksRouter');
const cors = require('cors');

let authors = require('./storage/authors');
let bookNames = require('./storage/bookNames');
let keywords = require('./storage/keywords');

app.set('view engine', 'ejs');

app.use(cors())

app.get('/authors', (req, res) => {
  res.render('authorEntity', {
    entityArray: authors,
    entityName: 'authors'
  });
})

app.get('/bookNames', (req, res) => {
  res.render('bookNameEntity', {
    entityArray: bookNames,
    entityName: 'bookNames'
  });
})

app.get('/keywords', (req, res) => {
  res.render('keywordEntity', {
    entityArray: keywords,
    entityName: 'keywords'
  });
})

app.use(express.json());
app.use('/', entityRouter);
app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})