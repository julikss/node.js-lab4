const fs = require('fs');
const Author = require('./entities/authorEntity');
const BookName = require('./entities/bookNameEntity');
const Keyword = require('./entities/keywordEntity');
const handlerNames = ["authors", "bookNames", "keywords"];
const classes = [Author, BookName, Keyword];

const getAllObjects = (req, res) => {
  try {
    const { name } = req.params;
    const objArray = require(`./storage/${name}.json`);

    res.json(objArray);
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Not found' });
  }
};

const getObject= (req, res) => {
  try {
    const { name, id } = req.params;
    const objArray = require(`./storage/${name}.json`);
    const reqObj = objArray.find(el => el.id == id);

    res.json(reqObj);
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Not found' });
  }
};

const deleteObject = (req, res) => {
  try {
    const { name, id } = req.params;
    const objArray = require(`./storage/${name}.json`);
    const filtered = objArray.filter(el => el.id != id);

    const modified = filtered.map((el, index) => {return {id: index, value: el.value}});
    fs.writeFileSync(`./storage/${name}.json`, JSON.stringify(modified), (err) => {
      if (err) throw err;
    });

    res.json("Successful request");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

const addObject = (req, res) => {
  try {
    const { name } = req.params;
    const { value } = req.body;
    const objArray = require(`./storage/${name}.json`);
    let newObject = {};

    for(let i = 0; i < classes.length; i++) {
      if(handlerNames[i] == name) {
        newObject = new classes[i](objArray.length > 0 ? objArray[objArray.length - 1].id + 1 : 0, value);
        break;
      }
    }
    objArray.push(newObject);
    fs.writeFileSync(`./storage/${name}.json`, JSON.stringify(objArray), (err) => {
      if (err) throw err;
    });

    res.status(201).json("Created");

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

const updateObject = (req, res) => {
  try {
    const { name, id } = req.params;
    const { value } = req.body;
    const objArray = require(`./storage/${name}.json`);

    for(let i = 0; i < objArray.length; i++) {
      if(objArray[i].id == id) {
        objArray[i].value = value;
      }
    }

    fs.writeFileSync(`./storage/${name}.json`, JSON.stringify(objArray), (err) => {
      if (err) throw err;
    });
    
    res.json("Object value was updated");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error found' });
  }
};

module.exports = {
  getAllObjects,
  getObject,
  deleteObject,
  addObject,
  updateObject
};