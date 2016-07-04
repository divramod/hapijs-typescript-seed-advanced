"use strict"
var MongoClient = require('mongodb').MongoClient;
var co = require('co');
var test = require('assert');
var colors = require('colors');

// helper()
module.exports.helper = co.wrap(function*(dbName, debug, remove, collectionName, findArr, data) {
  let db = yield MongoClient.connect('mongodb://localhost:27017/' + dbName);
  let col= db.collection(collectionName);

  let m = "[info]: ".blue + ( "COLLECTION: " + collectionName).yellow;
  console.log(m);

  if (remove) {
    yield col.remove();
  }

  for (let i = 0, len = data.length; i < len; i++) {
    let entity = data[i];

    let findObj = {};
    for (let i = 0, len = findArr.length; i < len; i++) {
      let findVar = findArr[i];
      findObj[findVar] = entity[findVar];
    }

    // TODO
    let docs = yield col.find(findObj).toArray();

    let m;
    if (docs.length === 0) {
      m = ("[info]: " +  JSON.stringify(entity) + " created!").blue;
      yield col.insertOne(entity);
    } else {
      m = ("[error]: " + JSON.stringify(entity) + " existent!").red;
    }
    if(debug) {
      console.log(m);
    }
  }
  db.close();
});

// getRandomId()
module.exports.getRandomId = co.wrap(function*(dbName, collectionName, debug) {

  let db = yield MongoClient.connect('mongodb://localhost:27017/' + dbName);
  let col= db.collection(collectionName);

  let docs = yield col.find().toArray();
  let count = docs.length;

  yield db.close();

  let id = docs[Math.floor(Math.random() * docs.length)]._id;

  if (debug) {
      let m = ("[info]: " + collectionName + " id created: " +  id).blue;
  }
  return id;
});

// getRandomIds()
module.exports.getRandomIds = co.wrap(function*(dbName, collectionName, number, debug) {

  let db = yield MongoClient.connect('mongodb://localhost:27017/' + dbName);
  let col= db.collection(collectionName);

  let docs = yield col.find().toArray();
  let count = docs.length;

  yield db.close();

  let ids = [];

  for (var i = 0, len = number; i < len; i++) {
    ids.push(docs[i]._id);
  }

  if (debug) {
      let m = ("[info]: " + collectionName + " id created: " +  id).blue;
  }
  return ids;
});
