//var checkinView = new CheckinView({ el: $("#checkinContainer") });

//var mapView = new MapView({ el: $("#mapContainer") });

$(document).ready(function () {
    router = new MainRouter();

    var user = new User();

    Backbone.history.start();
})
