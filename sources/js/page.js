'use strict';

var Page = SL.Dialog.extend({

  className: 'Page is-hidden',

  templateName: 'page',

  render: function() {
    this._super('render', arguments);
    return this;
  }
});

