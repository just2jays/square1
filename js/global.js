var checkinView = new CheckinView({ el: $("#checkinContainer") });

//var mapView = new MapView({ el: $("#mapContainer") });

var myRouter = Backbone.Router.extend({

    container: null,

    initialize: function() {
        this.container = new ContainerView({ el: $("#appContainer") });
    },

    routes: {
        "":"defaultIndex",
        "timeline": "handleTimeline"
    },

    defaultIndex: function() {
        console.log('default!!');
    },

    handleTimeline: function() {
        this.loadView(new HomeView());
    }
});
