/**
 * https://github.com/devbridge/jQuery-Autocomplete
 */
var Search = function() {
  this.device = null;
  this.project = null;
  this.mockData = [
    { value: "Andorra", data: "AD" },
    { value: "Zimbabwe", data: "ZZ" }
  ];
  this.init();
};

Search.prototype = {
  init: function() {
    this.el();
  },
  el: function() {
    this.$el = {};
    this.$el.device = $("#jq-device-autocomplete");
    this.$el.project = $("#jq-project-autocomplete");
  },
  localLookupDevice: function() {
    this.$el.device.autocomplete({
      lookup: this.mockData,
      onSelect: function() {}
    });
  },
  localLookupProject: function() {
    this.$el.project.autocomplete({
      lookup: this.mockData,
      onSelect: function() {}
    });
  },
  ajaxLookupDevice: function(url, callback) {
    this.$el.device.autocomplete({
      serviceUrl: url,
      onSelect: function(suggestion) {
        callback(suggestion);
      }
    });
  },
  ajaxLookupProject: function(url, callback) {
    this.$el.project.autocomplete({
      serviceUrl: url,
      onSelect: function(suggestion) {
        callback(suggestion);
      }
    });
  }
};
