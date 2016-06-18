var MainRouter = Backbone.Router.extend({
    container: null,
    checkinView: null,
    timelineView: null,

    initialize: function () {
        this.container = new AppContainerView({ el: $("#appContainer") });

        // Collapse the nav on item click
        this.bind( "all", function(){ $('.navbar-collapse').collapse('hide'); } );
    },

    routes: {
        "": "defaultIndex",
        "checkin": "defaultIndex",
        "timeline": "showTimeline",
        "inventory": "showInventory",
        "login": "showLogin",
        "logout": "handleLogout",
        "register": "showRegister"
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
    },

    showInventory: function () {
        if (this.InventoryView != null) {
            this.InventoryView.remove();
        }
        this.InventoryView = new InventoryView();

        this.container.myChildView = this.InventoryView;
        this.container.render();
    },

    showLogin: function () {
        if (this.loginView != null) {
            this.loginView.remove();
        }
        this.loginView = new loginView();

        this.container.myChildView = this.loginView;
        this.container.render();
    },

    showRegister: function () {
        if (this.registerView != null) {
            this.registerView.remove();
        }
        this.registerView = new registerView();

        this.container.myChildView = this.registerView;
        this.container.render();
    },

    handleLogout: function() {
        docCookies.removeItem('userid');
        docCookies.removeItem('usersession');
        appUser = new User({});
        window.location.href = "http://worldisending.com/#/login";
    }
});
