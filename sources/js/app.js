'use strict';

var App = SL.View.extend({
  el: 'body',

  initialize: function() {
    this.map = new MapView({ el: this.$('.Map') });
    this.header = new Header();
    this.render();
  },

  render: function() {
    this.map.render();
    this.$el.append(this.header.render().$el);
  }
});

$(function() {
  window.app = new App();
});
