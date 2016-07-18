"use strict";
var MongoDb = require('mongodb');
var UUID = require("node-uuid");
var configurations_1 = require("../../../configs/configurations");
var MongoRepository = (function () {
    function MongoRepository() {
        this.collection = this.getCollection(configurations_1.default.Repository.connectionString);
    }
    MongoRepository.prototype.getCollection = function (url) {
        var _this = this;
        return MongoDb.MongoClient.connect(url).then(function (db) {
            return db.collection(_this.getCollectionName());
        });
    };
    MongoRepository.prototype.findById = function (id) {
        return this.collection.then(function (collection) {
            return collection.findOne({ _id: id }).then(function (result) {
                return result;
            });
        });
    };
    MongoRepository.prototype.findByIdAndDelete = function (id) {
        return this.collection.then(function (collection) {
            return collection.deleteOne({ _id: id }).then(function (result) {
                console.log(result);
                return result;
            });
        });
    };
    MongoRepository.prototype.findByIdAndUpdate = function (id, entity) {
        return this.collection.then(function (collection) {
            entity.updatedAt = new Date();
            return collection.updateOne({ _id: id }, entity).then(function (result) {
                return entity;
            });
        });
    };
    MongoRepository.prototype.find = function (filter, top, skip) {
        return this.collection.then(function (collection) {
            return collection.find(filter).limit(top).skip(skip).toArray();
        });
    };
    MongoRepository.prototype.create = function (entity) {
        entity._id = UUID.v4();
        return this.collection.then(function (collection) {
            entity.createdDate = new Date();
            return collection.insertOne(entity).then(function (result) {
                return entity;
            });
        });
    };
    return MongoRepository;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MongoRepository;

//# sourceMappingURL=mongoRepository.js.map
