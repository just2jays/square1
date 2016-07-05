var MapView = Backbone.View.extend({
    template: JST['templates/timeline.html'],

    initialize: function(){

    },

    events: {
        "click .timeline-image": "showFullTimelineImage"
    },

    render: function(){
        if(appUser.get('loggedin')){
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
        }else{
            this.$el.html( '<div class="container"><div class="row"><div class="col-sm-8 col-sm-offset-2 text-center">Please Login</div></div></div>' );
            window.location.hash = 'login';
        }
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
    },

    showFullTimelineImage: function(el) {
        $('#the-modal-image').attr('src', el.target.src);
        $('#imagemodal').modal('show');
        
        return false;
    }
});
