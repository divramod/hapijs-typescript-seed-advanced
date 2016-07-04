// REQUIRE
var co = require('co');

// run(dbName, debug, remove)
co(function*() {

  var dbName = 'kegelapp';
  var debug = false;
  var remove = true;

  yield require('./../models/player.js').run(dbName, debug, remove);
  yield require('./../models/club.js').run(dbName, debug, remove);
  yield require('./../models/game.js').run(dbName, false, true);
  yield require('./../models/user.js').run(dbName, debug, remove);

}).catch(function(err) {
  console.log(err.stack)
});
