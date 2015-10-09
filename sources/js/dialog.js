'use strict';

SL.Dialog = SL.View.extend({
  className: 'Dialog is-hidden',

  events: {
    'click .js-cancel': 'close'
  },

  initialize: function(options) {

    _.bindAll(this, '_onKeyUp');

    $(document).on("keyup", this._onKeyUp);

    this.options = options;
    this.template = this._getTemplate(this.templateName);

    this._setupModel();
  },

  render: function() {
    this.$el.append(this.template(this.model.attributes));

    var api = this.$('.js-scroll').jScrollPane().data('jsp');

    if (api) {
      api.reinitialise();
    }

    return this;
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _setupModel: function() {
    this.model = new SL.Model({
      text: this.options.text,
      hidden: true
    });

    this.model.bind('change:hidden', this._onChangeHidden, this);
  },

  toggle: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  show: function() {
    this.model.set('hidden', false);
  },

  hide: function() {
    this.model.set('hidden', true);
  },

  close: function() {
    this.hide();
    this.trigger('close', this);
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

});

