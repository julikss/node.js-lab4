const fs = require('fs');
const books = require('./storage/books.json');
const authors = require('./storage/authors.json');
const bookNames = require('./storage/bookNames.json');
const keywords = require('./storage/keywords.json');

const addBook = (req, res) => {
  try {
    const value = req.body;
    let enteredKeywords = value.keywords.toLowerCase().split(', ');

    let title = bookNames.find(el => el.value == value.title);
    let author = authors.find(el => el.value == value.author);
    let keywordsArray = [];

    for(let el of keywords) {
      enteredKeywords.forEach(element => {
        if(element == el.value) keywordsArray.push(el);
      });
    }

    if(title && author && keywordsArray) {
      let newObject = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 0,
        title: title,
        author: author,
        keywords: keywordsArray
      };
  
      books.push(newObject);
      fs.writeFileSync('./storage/books.json', JSON.stringify(books), (err) => {
        if (err) throw err;
      });

      res.json('Successful request');
    } else {
      res.json('Data was not found');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
}

const deleteBook = (req, res) => {
  try {
    const { id } = req.params;
    
    const filtered = books.filter(el => el.id != id);

    const modified = filtered.map((el, index) => {return {id: index, title: el.title, author: el.author, keywords: el.keywords}});
    fs.writeFileSync('./storage/books.json', JSON.stringify(modified), (err) => {
      if (err) throw err;
    });

    res.json('Successful request');
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
}

const editBook = (req, res) => {
  try {
    const { id } = req.params;
    const value = req.body;
    let enteredKeywords = value.keywords.toLowerCase().split(', ');
    let keywordsArray = [];

    for(let el of keywords) {
      enteredKeywords.forEach(element => {
        if(element == el.value) keywordsArray.push(el);
      });
    }

    if(keywordsArray.length > 0) {
      books[id].keywords = keywordsArray;
  
      fs.writeFileSync('./storage/books.json', JSON.stringify(books), (err) => {
        if (err) throw err;
      });

      res.json('Successful request');
    } else {
      res.json('Data was not found');
    }

    res.json('Successful request');
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
}

const allBooks = (req, res) => {
  try {
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
}

module.exports = {
  addBook,
  deleteBook,
  editBook,
  allBooks
}