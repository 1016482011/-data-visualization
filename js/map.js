var Map = function(id) {
  this.map = new AMap.Map(id, {
    mapStyle: "amap://styles/grey"
  });
  this.marker = [];
};

Map.prototype = {
  addMarker: function(data) {
    for (let a of data) {
      var marker = new AMap.Marker({
        position: new AMap.LngLat(a.lngLat[0], a.lngLat[1]),
        icon: a.icon || "/assets/img/marker-danger.png",
        title: a.name
      });
      this.marker.push(marker);
    }
    this.map.add(this.marker);
  },
  setCenter: function(lngLat) {
    this.map.setCenter(new AMap.LngLat(lngLat[0], lngLat[1]));
  }
};
