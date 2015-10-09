'use strict';

var Header = SL.View.extend({

  tagName: 'header',
  className: 'Header',

  events: {
    'click .js-map': '_onClickMap',
    'click .js-about': '_onClickAbout',
    'click .js-privacy': '_onClickPrivacy'
  },

  initialize: function(options) {
    this.options = options;
    this.template = this._getTemplate('header');
    this.router = this.options.router;
  },

  render: function() {
    var options = {
      title: 'Streetlives NYC',
      url: 'http://beta.streetlives.nyc'
    };

    this.$el.append(this.template(options));
    return this;
  },

  _onClickMap: function() {
    this.router.navigate('/', { trigger: true });
  },

  _onClickAbout: function() {
    this.router.navigate('about', { trigger: true });
  },

  _onClickPrivacy: function() {
    this.router.navigate('privacy', { trigger: true });
  }

});
