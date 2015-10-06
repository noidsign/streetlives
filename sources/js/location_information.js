'use strict';

var LocationInformation = SL.View.extend({

  _TEXT: {
    title: 'Add location'
  },

  events: {
    'click .js-ok': '_onClickOk',
    'click .js-cancel': 'close'
  },

  className: 'LocationInformation is-hidden',

  initialize: function(options) {
    this.options = options;

    _.bindAll(this, '_onKeyUp');

    this.model = new Location(_.extend({ hidden: true }, this.options));

    this.model.bind('change:address', this._onChangeAddress, this);
    this.model.bind('change:name', this._onChangeName, this);
    this.model.bind('change:hidden', this._onChangeHidden, this);

    this.model.on("invalid", function(model, error) {
      if (error === 'name') {
        this.$(".js-field").addClass('has-error');
      }
    }, this);

    this.template = this._getTemplate('location_information');
  },

  render: function() {
    this.$el.empty();
    var options = _.extend({ title: this._TEXT.title }, this.model.attributes);
    this.$el.append(this.template(options));
    if (this.comments) {
    this.$('.js-fields').append(this.comments.$el);
    }
    return this;
  },

  _onChangeHidden: function() {
    this.$el.toggleClass('is-hidden', this.model.get('hidden'));
  },

  _onChangeName: function() {
    this.$('.js-name').val(this.model.get('name'));
  },

  _onChangeAddress: function() {
    this.$('.js-address').text(this.model.get('address'));
  },

  _onKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  },

  _onClickOk: function() {
    var ids = _.map(this.$('input:checked'), function(el) {
      return +$(el).val();
    });

    var name = this.$('.js-name').val();

    var self = this;

    this.model.save({ name: name, offerings: ids }, {
      success: function() {
      self.trigger('add_location', this.model, this);
      self.close();
    }});
  },

  _clear: function() {
    this.$('.js-checkbox').attr('checked', false);
    this.$(".js-field").removeClass('has-error');
    this.$('.js-name').val('');
  },

  _show: function() {
    var self = this;
    this.$el.fadeIn(150, function() {
      self.model.set('hidden', false);
    })
  },

  _hide: function() {
    var self = this;
    this.$el.fadeOut(150, function() {
      self.model.set('hidden', true);
    });
  },

  _onComment: function() {
    this.close();
  },

  isOpen: function() {
    return !this.model.get('hidden');
  },

  open: function(options) {
    $(document).on("keyup", this._onKeyUp);

    this.comments = new CommentsView({ location_id: options.cartodb_id });
    this.comments.render();
    this.comments.bind('comment', this._onComment, this);
    this.model.clear().set(_.extend({ offerings: '' }, options));
    this.render();
    this._show();
  },

  close: function() {
    $(document).off("keyup", this._onKeyUp);
    this._hide();
    this._clear();
  }
});

