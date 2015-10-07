'use strict';

var CommentsView = SL.View.extend({

  className: 'Comments',

  events: {
    'click .js-ok': '_onSubmit',
    'keyup .js-comment': '_onKeyUp',
    'click .js-like': '_onClickLike'
  },

  initialize: function(options) {
    _.bindAll(this, '_onFetchComments');

    this.options = options;
    this.template = this._getTemplate('comments');

    this.comment = new Comment({ liked: null, location_id: this.options.location_id });
    this.comment.bind('change:liked', this._onChangeLiked, this);
    this.comment.bind('change', this._checkEnabled, this);

    this.commentsTemplate = this._getTemplate('comments_list');

    this._setupModel();

    this.comments = new Comments();

    this.comments.fetch({
      data: { location_id: this.options.location_id },
      success: this._onFetchComments
    });
  },

  render: function() {
    this.$el.append(this.template({ comments: this.comments }));
    return this;
  },

  _renderComments: function() {
    this.$(".js-comments").append(this.commentsTemplate({ comments: this.comments }));
    var api = $('.CommentList').jScrollPane().data('jsp');
    api.reinitialise();
    this.$('.js-comment-list').animate({ opacity: 1 }, 150);
  },

  _setupModel: function() {
    this.model = new SL.Model({
      enabled: false
    });

    this.model.bind('change:enabled', this._onChangeEnabled, this);
  },

  _onChangeLiked: function() {
    this.$('.js-like').removeClass('is-selected');
    var liked = this.comment.get('liked');
    if (liked !== null) {
      this.$('[data-value="' + (liked ? 1 : 0) + '"]').addClass('is-selected');
    }
  },

  _onChangeEnabled: function() {
    this.$('.js-ok').toggleClass('is-disabled', !this.model.get('enabled'));
  },

  _onFetchComments: function() {
    this._renderComments();
  },

  _isEnabled: function() {
    return this.model.get('enabled');
  },

  _onClickLike: function(e) {
    this._killEvent(e);
    var like = $(e.target).data('value');
    var liked = this.comment.get('liked');
    console.log(like, liked)
    this.comment.set({ liked: (like == liked) ? null : like });
  },

  _checkEnabled: function() {
    var enabled = this.$('.js-comment').val().length > 0 || this.comment.get('liked') !== null;
    console.log(enabled)
    this.model.set('enabled', enabled);
  },

  _onKeyUp: function() {
    this.comment.set({ comment: this.$('.js-comment').val() });
  },

  _onSubmit: function(e) {
    if (!this._isEnabled()) {
      return;
    }

    this._killEvent(e);

    this.comment.on("invalid", function(model, error) {
      if (error === 'comment') {
        this.$(".js-comment").parent().addClass('has-error');
      }
    }, this);

    this.comments.add(this.comment);

    var self = this;
    console.log(this.comment.attributes)

    this.comment.save({}, {
      success: function() {
        self.$(".js-ok").addClass(".is-disabled");
        self.trigger('comment', this);
      }});
  }
});
