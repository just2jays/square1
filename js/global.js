var checkinView = new CheckinView({ el: $("#checkinContainer") });

//var mapView = new MapView({ el: $("#mapContainer") });

var myRouter = Backbone.Router.extend({

    container: null,
    view1: null,
    view2: null,
    view3: null,

    initialize: function() {
        this.container = new MapView({ el: $("#mapContainer") });
    },

    routes: {
        "timeline": "handleTimeline"
    },

    handleTimeline: function () {
        this.loadView(new HomeView());
    }
});
