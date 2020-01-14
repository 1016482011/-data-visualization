var Top = function() {
  this.init();
};

Top.prototype = {
  init: function() {
    this.el();
    this.event();
  },
  el: function() {
    this.$el = {};
    this.$el.top = $(".jq-top");
    this.$el.topImg = this.$el.top.find(".header-setting");
  },
  event: function() {
    var that = this;
    this.$el.top.hover(
      function() {
        $(this).addClass("header-setting-show");
        that.$el.topImg.removeClass("hide");
      },
      function() {
        that.$el.topImg.addClass("hide");
        $(this).removeClass("header-setting-show");
      }
    );
  }
};
