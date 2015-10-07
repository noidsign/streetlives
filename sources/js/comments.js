'use strict';

var CommentsView = SL.View.extend({

  className: 'Comments',

  events: {
    'click .js-ok': '_onSubmit'
  },

  initialize: function(options) {
    _.bindAll(this, '_onFetchComments');

    this.options = options;
    this.template = this._getTemplate('comments');
    this.commentsTemplate = this._getTemplate('comments_list');

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
    this.$('.js-comments').animate({ opacity: 1 }, 150);
  },

  _onFetchComments: function() {
    this._renderComments();
  },

  _onSubmit: function(e) {
    this._killEvent(e);
    var msg = this.$('.js-comment').val();
    var comment = new Comment({ location_id: this.options.location_id, comment: msg });

    comment.on("invalid", function(model, error) {
      if (error === 'comment') {
        this.$(".js-comment").parent().addClass('has-error');
      }
    }, this);

    this.comments.add(comment);

    var self = this;
    comment.save({}, {
      success: function() {
      self.trigger('comment', this);
    }});
  }
});
