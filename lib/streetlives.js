'use strict';

module.exports = function(Config) {
  var module = {};
  module.DB = require('./db')(Config);

  module.getOfferings = function(callback) {
    this.DB.getOfferings(callback);
  };

  module.getComments = function(location_id, callback) {
    this.DB.getComments(location_id, callback);
  };

  module.insertComment = function(comment, callback) {
    this.DB.insertComment(comment, callback);
  };

  module.insertLocation = function(location, callback) {
    var name = location.name;
    var lat = location.coordinates[0];
    var lng = location.coordinates[1];
    var offerings = location.offerings;
    var comment = location.comment;
    var address = location.address;

    this.DB.insertLocation(name, address, lat, lng, offerings, comment, callback);
  };

  return module;
};
