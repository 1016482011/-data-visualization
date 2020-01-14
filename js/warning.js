var Warning = function() {
  this.init();
  this.time = 10000;
  this.timer = null;
};
Warning.prototype = {
  init: function() {
    this.el();
  },
  el: function() {
    this.$el = {};
    this.$el.warn = $(".jq-warning");
  },
  display: function(data) {
    if (!data) return;
    this.$el.warn
      .find(".jq-item")
      .eq(0)
      .text(data.location)
      .end()
      .eq(1)
      .text(data.id)
      .end()
      .eq(2)
      .text(data.status)
      .end()
      .eq(3)
      .text(data.intro);
  },
  show: function() {
    this.clearTimeout();
    this.$el.warn.show();
    this.timer = setTimeout(this.hide.bind(this), this.time);
  },
  hide: function() {
    this.$el.warn.hide();
    this.clearTimeout();
  },
  clearTimeout: function() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
};
