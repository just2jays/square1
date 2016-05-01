//var checkinView = new CheckinView({ el: $("#checkinContainer") });

//var mapView = new MapView({ el: $("#mapContainer") });

$(document).ready(function () {
    router = new MainRouter();

    appUser = new User();

    Backbone.history.start();
})
