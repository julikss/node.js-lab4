const { error } = require('console');
const fs = require('fs');
const Author = require('./entities/authorEntity');
const BookName = require('./entities/bookNameEntity');
const Keyword = require('./entities/keywordEntity');
const handlerNames = ["authors", "bookNames", "keywords"];
const classes = [Author, BookName, Keyword];

const getAllObjects = (req, res) => {
  try {
    const { name } = req.params;
    const parameters = req.query;
    const objArray = require(`./storage/${name}.json`);

    if(Object.keys(req.query).length == 1) {
      let filteredObjArray = objArray.filter(el => el.value == parameters.param);
      res.status(200).json(filteredObjArray);
    } else if (Object.keys(req.query).length == 2) {
      let start = ((parameters.page - 1) * parameters.items_per_page);
      let end = start + Number(parameters.items_per_page);
      let paginatedObjects = objArray.slice(start, end);
      console.log(end)
      res.status(200).json(paginatedObjects);
    } else {
      res.status(200).json(objArray);
    }
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

const getObject= (req, res) => {
  try {
    const { name, id } = req.params;
    const objArray = require(`./storage/${name}.json`);
    const reqObj = objArray.find(el => el.id == id);

    res.status(200).json(reqObj);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
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

    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

const addObject = (req, res) => {
  try {
    const { name } = req.params;
    const { value } = req.body;
    const objArray = require(`./storage/${name}.json`);
    let newObject = {};

    if(value) {
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
    } else throw error
    
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
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
    
    res.status(200).json("Updated");
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  getAllObjects,
  getObject,
  deleteObject,
  addObject,
  updateObject
};