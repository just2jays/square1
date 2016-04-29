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
    				var options = { timeout: 31000, enableHighAccuracy: true, maximumAge: 60000 };
    				navigator.geolocation.getCurrentPosition(_.bind(this.fetchNearbyFoursquareVenues, this), this.geoError, options );
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
    	latitude = position.coords.latitude;
    	longitude = position.coords.longitude;
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
