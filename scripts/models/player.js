"use strict"
var co = require('co');
var helper = require('./../utils/helper.js').helper;

module.exports.run = co.wrap(function*(dbName, debug, remove) {

  // TODO
  let collectionName = 'player';
  let data = [
    { lastname: "Petermann", forename: "Arvid" },
    { lastname: "Petermann", forename: "Katja" },
    { lastname: "Petermann", forename: "Linus" },
    { lastname: "Petermann", forename: "Yamo" },
  ];
  let findArr = [ 'lastname', 'forename' ];

  yield helper(dbName, debug, remove, collectionName, findArr, data);
});
