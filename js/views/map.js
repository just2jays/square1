var MapView = Backbone.View.extend({
    template: JST['templates/map.html'],

    initialize: function(){
        this.render();
    },

    events: {
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = {};

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );

        this.plotCheckinPoints();
    },

    plotCheckinPoints: function() {
        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
        var mapOptions = {
          zoom: 8,
          center: myLatlng
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

        var checkinsCollection = new CheckinsCollection();
        checkinsCollection.fetch({
            success: _.bind(function (checkinsCollection, response) {
                console.log(response);
                _.each(response, function(checkin) {
                    var latLng = new google.maps.LatLng(checkin.latitude, checkin.longitude);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        title: checkin.name
                    });
                    marker.setMap(map);
                });

                this.reCenter(map, response);
            }, this)
        });
    },

    reCenter: function(map, response) {
        var latlngbounds = new google.maps.LatLngBounds();
        _.each(response, function(checkin) {
            latlngbounds.extend( new google.maps.LatLng(parseFloat(checkin.latitude), parseFloat(checkin.longitude)) );
        });
        map.setCenter( latlngbounds.getCenter() );
    }
});
