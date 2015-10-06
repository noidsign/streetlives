'use strict';

var Header = SL.View.extend({

  tagName: 'header',
  className: 'Header',

  initialize: function() {
    this.template = this._getTemplate('header');
  },

  render: function() {
    var options = {
      title: 'Streetlives NYC',
      url: 'http://beta.streetlives.nyc'
    };
    this.$el.append(this.template(options));
    return this;
  }

});
