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
        console.log('show default checkin');
        if (this.checkinView == null) {
            console.log('yep null for now');
            this.checkinView = new CheckinView();
        }
        console.log(this);
        this.container.myChildView = this.checkinView;
        this.container.render();
    },

    timelineView: function () {
        console.log('show timeline');
        if (this.timelineView == null) {
            this.timelineView = new MapView();
        }
        console.log(this);
        this.container.myChildView = this.timelineView;
        this.container.render();
    }
});
