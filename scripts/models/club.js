"use strict"
var co = require('co');
var helper = require('./../utils/helper.js').helper;

// RUN
module.exports.run = co.wrap(function*(dbName, debug, remove) {
  // TODO
  let collectionName = 'club';
  let data = [
    { name: "SV Lichterfelde" },
    { name: "ESV Eberswalde" }
  ];
  let findArr = [ 'name' ];

  yield helper(dbName, debug, remove, collectionName, findArr, data);
});
