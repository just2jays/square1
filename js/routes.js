var MainRouter = Backbone.Router.extend({
    container: null,
    checkinView: null,
    timelineView: null,

    initialize: function () {
        this.container = new AppContainerView({ el: $("#appContainer") });
    },

    routes: {
        "": "defaultIndex",
        "timeline": "showTimeline"
    },

    defaultIndex: function () {
        if (this.checkinView != null) {
            this.checkinView.remove();
        }
        this.checkinView = new CheckinView();

        this.container.myChildView = this.checkinView;
        this.container.render();
    },

    showTimeline: function () {
        if (this.timelineView != null) {
            this.timelineView.remove();
        }
        this.timelineView = new MapView();

        this.container.myChildView = this.timelineView;
        this.container.render();

        /* timelineView does NOT render on init() because we ned to render
            render the map DOM element before loading Google Maps
            ...thus we load it last */
        this.timelineView.render();
    }
});
