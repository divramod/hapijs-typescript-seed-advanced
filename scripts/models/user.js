"use strict"
var co = require('co');
var helper = require('./../utils/helper.js').helper;
var getRandomIds = require('./../utils/helper.js').getRandomIds;

// RUN
module.exports.run = co.wrap(function*(dbName, debug, remove) {
  // TODO
  let collectionName = 'user';
  let data = [
    { username: "arvid", email: "arvidpetermann@gmail.com", password: "pw" },
    { username: "katja", email: "katjapetermann@gmail.com", password: "pw" },
    { username: "linus", email: "linuspetermann@gmail.com", password: "pw" },
    { username: "yamo", email: "yamopetermann@gmail.com", password: "pw" },
  ];

  for (var i = 0, len = data.length; i < len; i++) {
     data[i].ids_player = yield getRandomIds(dbName, 'player', 2);
  }

  let findArr = [ 'username', 'email' ];
  yield helper(dbName, debug, remove, collectionName, findArr, data);
});
