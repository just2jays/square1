this["JST"] = this["JST"] || {};

this["JST"]["templates/checkin.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <h2 class="widget-title text-center">Check In Here</h2>\n    <div class="row">\n        <div class="col-md-8 col-md-offset-2">\n            <div class="fetchFromFoursquare">\n                <p class="text-center">In this location, on this day, you did some awesome stuff...</p>\n                <p><button type="button" id="BeginCheckin" class="btn btn-block btn-lg">' +
((__t = ( data.search_label )) == null ? '' : __t) +
'</button></p>\n                <div class="text-center">\n                    <i class="loading-indicator fa fa-spinner fa-pulse fa-spin"></i>\n                </div>\n                <div class="list-group location-list"></div>\n            </div>\n        </div><!-- col-lg-8 -->\n    </div><!-- row -->\n</div><!-- container -->\n\n<div id="foursquareModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="foursqareModal" aria-hidden="true">\n\t<form id="existingLocationForm" role="form">\n\t\t<div class="modal-dialog">\n\t\t\t<div class="modal-content">\n\t\t\t\t<div class="modal-header">\n\t\t\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n\t\t\t\t\t<h4 class="existingLocationName modal-title" id="myModalLabel"></h4>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-body default-body">\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<h3></h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<i class="fa fa-bullhorn"></i> Got something to say?\n\t\t\t\t\t\t<textarea id="CheckinMessageInput" class="checkinMessageInput form-control" rows="4"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-body response-body">\n\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t<h3></h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="well prize-well">\n\t\t\t\t\t\t<i class="fa fa-gift fa-3"></i> Prizes\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="modal-footer">\n\t\t\t\t\t<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n\t\t\t\t\t<button type="submit" class="existing_save btn btn-primary">Here</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n</div>\n';
return __p
};

this["JST"]["templates/inventory.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container inventoryContainer">\n    <div class="row">\n        <div class="col-sm-6 col-md-4">\n            <div class="thumbnail inventoryItem">\n                <img src="" />\n                <div class="caption">\n                    <h3>item name</h3>\n                    <p>This is item #[unique_id] of the set!<br />You won this prize [some hours, days and/or mins] ago</p>\n                </div>\n            </div>\n        </div>\n    </div><!-- row -->\n</div><!-- container -->\n';
return __p
};

this["JST"]["templates/login.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <form class="form-signin">\n        <h2 class="form-signin-heading">Please sign in</h2>\n        <label for="inputEmail" class="sr-only">Email address</label>\n        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>\n        <label for="inputPassword" class="sr-only">Password</label>\n        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>\n        <div class="checkbox">\n            <label>\n                <input type="checkbox" value="remember-me"> Remember me\n            </label>\n        </div>\n        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>\n    </form>\n</div> <!-- /container -->\n';
return __p
};

this["JST"]["templates/register.html"] = function(data) {
var __t, __p = '', __e = _.escape;
__p += '<div class="container">\n    <form class="form-signin">\n        <h2 class="form-signin-heading">Please sign in</h2>\n        <label for="inputEmail" class="sr-only">Email address</label>\n        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>\n        <label for="inputPassword" class="sr-only">Password</label>\n        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>\n        <div class="checkbox">\n            <label>\n                <input type="checkbox" value="remember-me"> Remember me\n            </label>\n        </div>\n        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>\n    </form>\n</div> <!-- /container -->\n';
return __p
};

this["JST"]["templates/timeline.html"] = function(data) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="container">\n    <div class="row">\n        <div class="col-md-8">\n            <div class="mapWrapper">\n                <div id="map-canvas" style="width: 100%; height: 400px;"></div>\n            </div>\n        </div><!--col-md-8-->\n        <div class="col-md-4">\n            <p>LAST SEEN AT:</p>\n            <h4 class="lastSeenLabel">' +
((__t = ( data[0].name )) == null ? '' : __t) +
'</h4>\n            ' +
((__t = ( data[0].review )) == null ? '' : __t) +
'\n        </div><!--col-md-4-->\n    </div>\n</div><!-- container -->\n\n<div class="container">\n\t<div class="row">\n\t\t<div class="col-md-8 col-md-offset-2">\n\t\t\t<div class="panel panel-default">\n                <div class="panel-body">\n                    <ul class="timeline">\n                        ';
 _.each(data, function(checkin, index){ ;
__p += '\n                            <li class="';
 if (index%2 ==0) { ;
__p += 'timeline-inverted';
 } ;
__p += '">\n                                <div class="timeline-badge"><i class="fa fa-check"></i></div>\n                                <div class="timeline-panel">\n                                    <h4 class="timeline-title">' +
((__t = ( checkin.name )) == null ? '' : __t) +
'</h4>\n                                    ';
 if ( !_.isEmpty(checkin.review) ){ ;
__p += '\n                                        <blockquote><p>' +
((__t = ( checkin.review )) == null ? '' : __t) +
'</p></blockquote>\n                                    ';
 } ;
__p += '\n                                    <p><small><i class="fa fa-clock-o"></i>' +
((__t = ( checkin.timestamp )) == null ? '' : __t) +
'</small></p>\n                                </div>\n                            </li>\n                        ';
 }); ;
__p += '\n                    </ul>\n                </div>\n            </div>\n\t\t</div><!-- col-md-8 -->\n\t</div><!-- row -->\n</div><!-- container -->\n';
return __p
};
var Checkin = Backbone.Model.extend({
    defaults: {
    },
    idAttribute: "ID",
    initialize: function(){
        this.on("invalid", function(model, error){
            console.log("We have an issue: " + error);
        });
    },
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);
    },
    // local dev api
    //urlRoot: 'http://localhost/api/Checkins'
    // production api
    urlRoot: 'api/Checkins'
});

var Item = Backbone.Model.extend({
    defaults: {
        ID: 0,
        name: "",
        image:""
    },
    idAttribute: "ID",
    initialize: function(){
        this.on("invalid", function(model, error){
            console.log("We have an issue: " + error);
        });
    },
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);
    },
    // local dev api
    //urlRoot: 'http://localhost/api/Items'
    // production api
    urlRoot: 'api/Items'
});

var Place = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: 'No Name',
        venue_id: ''
    },

    initialize: function(){
        this.on("change:name", function(model){
            var name = model.get("name");
        });
    },

    rename: function(newName) {
        this.set({ name: newName });
    }
});

var User = Backbone.Model.extend({
    defaults: {
        username: '',
    },
    idAttribute: "ID",
    initialize: function(){
        this.on("invalid", function(model, error){
            console.log("We have an issue: " + error);
        });
    },
    constructor: function (attributes, options) {
        Backbone.Model.apply(this, arguments);
    },
    // local dev api
    //urlRoot: 'http://localhost/api/Items'
    // production api
    urlRoot: 'api/Users'
});

var AppContainerView = Backbone.View.extend({
     myChildView: null,

     render: function() {
        this.$el.html(this.myChildView.$el);
        return this;
    }
});

var CheckinView = Backbone.View.extend({
    template: JST['templates/checkin.html'],

    initialize: function(){
        this.venues = [];
        this.selectedVenue = {};
        this.render();
    },

    events: {
        "submit #existingLocationForm": "saveCheckin",
        "click #BeginCheckin": "beginCheckin",
        "click .fetchFromFoursquare .location-list .foursquare_venue": "openVenueDetails"
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = { search_label: "Here Now" };

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    },

    /*
     * function: getGeoInfo
     *      Uses the device's built-in GPS location feature to get the lat/long
     *      of the device and pass to a function
     */
    getGeoInfo: function(caller){
    	if(navigator.geolocation){
    		switch (caller){
    			case 'foursquare':
    				//var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 60000 };
                    $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBR4ZbiSLS-Rl7cKghQ3eZT3Ima_IsLgd4",_.bind(function(data){
                        this.fetchNearbyFoursquareVenues(data);
                    }, this));
    				//navigator.geolocation.getCurrentPosition(_.bind(this.fetchNearbyFoursquareVenues, this), this.geoError, options );
    				break;
    			case 'current':
    				navigator.geolocation.getCurrentPosition(showLocation);
    				break;
    		}
    	}else{
    	  alert("Sorry, browser does not support geolocation!");
    	}
    },

    geoError: function(positionError){
    	alert('Error 420 - Try Again');
    	$('.fetchFromFoursquare .loading-indicator').fadeOut();
    },

    /*
     * function: fetchNearbyFoursquareVenues
     *     Uses Foursquare's api to search for venues near the lat/long passed
     *     as a response from getGeoInfo();
     */
    fetchNearbyFoursquareVenues: function(position){
        console.log(position);
    	latitude = position.location.lat;
    	longitude = position.location.lng;
    	var d = new Date();
    	var year = d.getFullYear();
    	var month = ("0" + (d.getMonth() + 1)).slice(-2);
    	var day = ("0" + d.getDate()).slice(-2);
    	var getUrl = 'https://api.foursquare.com/v2/venues/search?ll='+latitude+','+longitude+'&client_id=C1LVPW1U2RT313HW4B0DRHFHSYFC2YQYTMUPZ0FF0SPVDDV2&client_secret=K2ZGG5FKKV24AVUTTQHKEA1UHNZKODSOYCDMWHVD2CQJ2IWP&v='+year+month+day;

    	$.get(getUrl, _.bind(function(data) {
    		// set fetched Foursquare data for global availability
    		fetchObj = data;

    		// hide the loading indicator
    		$('.fetchFromFoursquare .loading-indicator').fadeOut();

    		$.each(data.response.venues, _.bind(function(index, venue){
                this.venues.push(venue);
    			$('.fetchFromFoursquare .location-list').append('<a href="#" class="list-group-item foursquare_venue" data-venue-identifier="'+venue.id+'" data-venue-index="'+index+'">'+venue.name+'</a>');
    		}, this));

    		//append link for new location
    		$('.fetchFromFoursquare .location-list').append('<a href="#" class="list-group-item new_venue">Venue not listed? Add it!</a>');

    	},this))
    	.done(function() {

    	})
    	.fail(function() {
    	    console.log( "Error: Failed GET from Foursquare." );
    	})
    	.always(function() {
    	    //runs no matter what!
    	}, "json");
    },

    openVenueDetails: function(e){
        e.preventDefault();
        chosen_venue_index = $(e.currentTarget).data('venueIndex');
        chosen_venue_id = $(e.currentTarget).data('venueIdentifier');
        this.selectedVenue = this.venues[chosen_venue_index];

        //some cheesy resetting for ajaxyness sake
        $('#foursquareModal .modal-header,#foursquareModal .modal-footer').show();
        $('#foursquareModal .checkinMessageInput').val('')
        $('#foursquareModal .modal-body.default-body').show();
        $('#foursquareModal .modal-body.response-body').hide();

        $('#foursquareModal .modal-header h4.modal-title').html(this.venues[chosen_venue_index].name);
        $('#foursquareModal .modal-body h3').html(this.venues[chosen_venue_index].location.formattedAddress[0]+'<br />'+this.venues[chosen_venue_index].location.formattedAddress[1]+'<br />'+this.venues[chosen_venue_index].location.formattedAddress[2]);
        $('#foursquareModal').modal();
    },

    beginCheckin: function( event ){
        // Button clicked, you can access the element that was clicked with event.currentTarget
        $('.fetchFromFoursquare .location-list').html('');
		$('.fetchFromFoursquare .loading-indicator').fadeIn();
        this.getGeoInfo('foursquare');
    },

    saveCheckin: function( e ){
        e.preventDefault();

        var checkin = new Checkin({
            user_id: 1,
            foursquare_venue_id: this.selectedVenue.id,
            name: this.selectedVenue.name,
            latitude: this.selectedVenue.location.lat,
            longitude: this.selectedVenue.location.lng,
            review: !_.isEmpty($(e.currentTarget).find('.checkinMessageInput').val()) ? $(e.currentTarget).find('.checkinMessageInput').val() : null
        });
        checkin.save({}, {
            success: function (model, respose, options) {
                $('.fetchFromFoursquare .location-list').html('');
                $('#foursquareModal .modal-footer').slideUp();
                $('#foursquareModal .modal-body.response-body .prize-well').html('');
                $('#foursquareModal .modal-body h3').html('<i class="fa fa-check-circle-o fa-3"></i> '+model.get('prize').message);
                $('#foursquareModal .modal-body.response-body .prize-well').html('<div>'+model.get('prize').message+'</div>');

                // Worthy of a prize?!
                if(model.get('prize').success) {
                    // won
                    $('#foursquareModal .modal-body.response-body .prize-well').append('<div class="prizeBox"><img src="'+model.get('prize').item.image+'" /><div class="item-name">'+model.get('prize').item.name+' #'+model.get('prize').item.unique+'</div></div>');
                }

                $('#foursquareModal .modal-body.default-body').fadeOut();
                $('#foursquareModal .modal-body.response-body').fadeIn();
                $('.loading-indicator').hide();
                $('button#checkinSubmitBtn').show();
            },
            error: function (model, xhr, options) {
                console.log("Something went wrong while saving the checkin");
            }
        });
    }
});

var InventoryView = Backbone.View.extend({
    template: JST['templates/inventory.html'],

    initialize: function(){
        this.render();
    },

    events: {
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = { search_label: "Here Now" };

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});

var loginView = Backbone.View.extend({
    template: JST['templates/login.html'],

    initialize: function(){
        this.render();
    },

    events: {
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = { search_label: "Here Now" };

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});

var RegisterView = Backbone.View.extend({
    template: JST['templates/register.html'],

    initialize: function(){
        this.render();
    },

    events: {

    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = { search_label: "Here Now" };

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});

var MapView = Backbone.View.extend({
    template: JST['templates/timeline.html'],

    initialize: function(){

    },

    events: {
    },

    render: function(){
        var checkinsCollection = new CheckinsCollection();
        checkinsCollection.fetch({
            success: _.bind(function (checkinsCollection, response) {
                // Compile the template using underscore
                var template = this.template(response);

                // Load the compiled HTML into the Backbone "el"
                this.$el.html( template );

                this.plotCheckinPoints(response);
            }, this)
        });
    },

    plotCheckinPoints: function(response) {
        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
        var mapOptions = {
          zoom: 8,
          center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
        _.each(response, function(checkin) {
            var latLng = new google.maps.LatLng(checkin.latitude, checkin.longitude);
            var marker = new google.maps.Marker({
                position: latLng,
                title: checkin.name
            });
            marker.setMap(map);
        });

        this.reCenter(map, response);
    },

    reCenter: function(map, response) {
        var latlngbounds = new google.maps.LatLngBounds();
        _.each(response, function(checkin) {
            latlngbounds.extend( new google.maps.LatLng(parseFloat(checkin.latitude), parseFloat(checkin.longitude)) );
        });
        map.setCenter( latlngbounds.getCenter() );
    }
});

var CheckinsCollection = Backbone.Collection.extend({
    model: Checkin,

    // local dev api
    //url: 'http://localhost/api/Checkins'
    // production api
    url: 'api/Checkins'
});

var MainRouter = Backbone.Router.extend({
    container: null,
    checkinView: null,
    timelineView: null,

    initialize: function () {
        this.container = new AppContainerView({ el: $("#appContainer") });
    },

    routes: {
        "": "defaultIndex",
        "timeline": "showTimeline",
        "inventory": "showInventory",
        "login": "showLogin",
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
        if (this.inventoryView != null) {
            this.inventoryView.remove();
        }
        this.inventoryView = new inventoryView();

        this.container.myChildView = this.inventoryView;
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
    }
});

//var checkinView = new CheckinView({ el: $("#checkinContainer") });

//var mapView = new MapView({ el: $("#mapContainer") });

$(document).ready(function () {
    router = new MainRouter();

    var user = new User();

    Backbone.history.start();
})
