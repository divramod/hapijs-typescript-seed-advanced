"use strict"
var co = require('co');
var helper = require('./../utils/helper.js').helper;
var getRandomId = require('./../utils/helper.js').getRandomId;

// getRandomDate
function getRandomDate() {
  return new Date();
}

// getRandomThrows
function getRandomThrows() {
  let th = [];
  for (var i = 0, len = 120; i < len; i++) {
    th.push(Math.floor(Math.random() * 10) );
  }
  return th;
}

// RUN
module.exports.run = co.wrap(function*(dbName, debug, remove) {
  // TODO
  let collectionName = 'game';
  let data = [];
  for (var i = 0, len = 50; i < len; i++) {
    data.push({
      id_player: yield getRandomId( dbName, 'player' ),
      date: getRandomDate(), 
      public: [true, false][Math.round(Math.random())],
      throws: getRandomThrows(),
    });
  }
  let findArr = [ 'player', 'date' ];
  yield helper(dbName, debug, remove, collectionName, findArr, data);
});
