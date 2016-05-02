var User = Backbone.Model.extend({
    defaults: {
        ID: 0,
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

    handleUser: function(callback) {
        if( !_.isNull(docCookies.getItem('userid')) && !_.isNull(docCookies.getItem('usersession')) ){
            console.log('first');
            $.get( this.urlRoot+'/checkLoginState', _.bind(function(data) {
                console.log(data);
        		if(data.loggedin) {
                    this.fetch({
                        success: _.bind(function () {
                            callback();
                        }, this),
                        error: (function (e) {
                            console.log(e);
                            console.log(' Service request failure: ' + e);
                        })
                    });
                }else{
                    callback();
                }
        	},this))
        	.done(function() {
        	})
        	.fail(function() {
                return false;
        	})
        	.always(function() {
        	}, "json");
        }else{
            console.log('else');
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
