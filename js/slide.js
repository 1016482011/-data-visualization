var Slide = function() {
  this.init();
  this.warnTimer = null;
  this.infoTimer = null;
};

Slide.prototype = {
  init: function() {
    this.el();
  },
  el: function() {
    this.$el = {};
    this.$el.warn = $(".jq-warn-list");
    this.$el.warnItem = $(".jq-warn-item")
      .detach()
      .removeClass("hide");
    this.$el.info = $(".jq-info-list");
    this.$el.infoItem = $(".jq-info-item")
      .detach()
      .removeClass("hide");
  },
  warnListDisplay: function(data) {
    if (this.warnTimer) clearInterval(this.warnTimer);
    var that = this;
    var container = $("<div />");
    for (let a of data) {
      var warnItemCopy = this.$el.warnItem.clone();
      warnItemCopy
        .find(".flex-item")
        .eq(0)
        .text(a.id)
        .end()
        .eq(2)
        .text(a.status);
      container.append(warnItemCopy);
    }
    this.$el.warn.html(container);
    if (data.length > 4) {
      this.warnTimer = setInterval(function() {
        that.doWarnScroll();
      }, 2000);
    }
  },
  infoListDisplay: function(data) {
    if (this.infoTimer) clearInterval(this.infoTimer);
    var that = this;
    var container = $("<div />");
    for (let a of data) {
      var infoItemCopy = this.$el.infoItem.clone();
      infoItemCopy
        .find(".flex-item")
        .eq(0)
        .text(a.id)
        .end()
        .eq(1)
        .text(a.type)
        .end()
        .eq(2)
        .text(a.time);
      container.append(infoItemCopy);
    }
    this.$el.info.html(container);
    if (data.length > 4) {
      this.infoTimer = setInterval(function() {
        that.doInfoScroll();
      }, 2000);
    }
  },
  doWarnScroll: function() {
    var $parent = this.$el.warn;
    var $first = $parent.find(".jq-warn-item:first");
    var height = $first.height();
    $first.animate(
      {
        marginTop: -height + "px"
      },
      500,
      function() {
        $first.css("marginTop", 0).appendTo($parent);
      }
    );
  },
  doInfoScroll: function() {
    var $parent = this.$el.info;
    var $first = $parent.find(".jq-info-item:first");
    var height = $first.height();
    $first.animate(
      {
        marginTop: -height + "px"
      },
      500,
      function() {
        $first.css("marginTop", 0).appendTo($parent);
      }
    );
  }
};
