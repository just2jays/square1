var MainRouter = Backbone.Router.extend({
    container: null,
    checkinView: null,
    timelineView: null,

    initialize: function () {
        this.container = new AppContainerView({ el: $("#appContainer") });
    },

    routes: {
        "": "defaultIndex",
        "timeline": "timelineView"
    },

    defaultIndex: function () {
        if (this.checkinView == null) {
            this.checkinView = new CheckinView();
        }

        this.container.myChildView = this.checkinView;
        this.container.render();
    },

    timelineView: function () {
        if (this.timelineView == null) {
            console.log('whaaat');
            this.timelineView = new MapView();
        }

        this.container.myChildView = this.timelineView;
        this.container.render();
    }
});
