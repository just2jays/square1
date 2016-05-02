var User = Backbone.Model.extend({
    defaults: {
        ID: 0,
        username: '',
        loggedin: false
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

    handleUser: function(callback) {
        if( !_.isNull(docCookies.getItem('userid')) && !_.isNull(docCookies.getItem('usersession')) ){
            $.get( this.urlRoot+'/checkLoginState', _.bind(function(data) {
                console.log(data);
        		if(data.loggedin) {
                    this.set({
                        'ID': data.id,
                        'loggedin': true,
                        'username': data.username
                    });
                }
                callback();
        	},this))
        	.done(function() {
        	})
        	.fail(function() {
        	})
        	.always(function() {
        	}, "json");
        }else{
            this.loggedin = false;
            callback();
        }
    },

    userLogin: function(userdata) {
        $.post( this.urlRoot+"/login", userdata, function(data) {
            console.log(data);
        })
        .done(function() {
        })
        .fail(function() {
            console.log('oops error!');
        })
        .always(function() {
        });
    },

    // local dev api
    //urlRoot: 'http://localhost/api/Items'
    // production api
    urlRoot: 'api/Users'
});
