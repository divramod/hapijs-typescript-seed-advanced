'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;

  // CLUBS
  const clubs = db.collection('clubs');

  let clubsArray = [
    { name: "SV Lichterfelde" },
    { name: "Freya Marienwerder" }
  ];

};

exports.register.attributes = {
  name: 'sample'
};
