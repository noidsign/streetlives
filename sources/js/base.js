'use strict';

var SL = {};

SL.Model = Backbone.Model.extend({
});

SL.Collection = Backbone.Collection.extend({
});

SL.View = Backbone.View.extend({
  _killEvent: function(e) {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
    }
  },

  _getTemplate: function(name) {
    return JST['sources/templates/' + name + '.jst.ejs'];
  }
});

Popup = L.Popup.extend({
  initialize: function (options, source) {
    this.options.className = 'Popup';
    L.setOptions(this, options);

    this._source = source;
  },
});

SL.Popup = function(options) {
  return new Popup(options);
};
