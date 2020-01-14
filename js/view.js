/**
 * 用来渲染设备信息和项目信息
 */
var View = function() {
  this.init();
};

View.prototype = {
  init: function() {
    this.el();
  },
  el: function() {
    this.$el = {};
    this.$el.device = $(".jq-device");
    this.$el.project = $(".jq-project");
  },
  displayDevice: function(data) {
    if (!data) return;
    this.$el.device
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
  displayProject: function(data) {
    if (!data) return;
    this.$el.project
      .find(".jq-item")
      .eq(0)
      .text(data.name)
      .end()
      .eq(1)
      .text(data.location)
      .end()
      .eq(2)
      .text(data.count);
  }
};
