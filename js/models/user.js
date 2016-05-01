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

    isLoggedIn: function() {
        $.get('api/checkUserLogin', _.bind(function(data) {
    		// set fetched Foursquare data for global availability
    		console.log(data);
    	},this))
    	.done(function() {
    	})
    	.fail(function() {
    	})
    	.always(function() {
    	}, "json");
    },
    
    // local dev api
    //urlRoot: 'http://localhost/api/Items'
    // production api
    urlRoot: 'api/Users'
});
