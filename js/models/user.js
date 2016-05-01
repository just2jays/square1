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
        $.get('api/Users/checkLoginState', _.bind(function(data) {
    		if(data.loggedin) {
                return true;
            }else{
                return false;
            }
    	},this))
    	.done(function() {
    	})
    	.fail(function() {
            return false;
    	})
    	.always(function() {
    	}, "json");
    },

    // local dev api
    //urlRoot: 'http://localhost/api/Items'
    // production api
    urlRoot: 'api/Users'
});
