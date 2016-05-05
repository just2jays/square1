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
        		if(data.loggedin) {
                    this.set({
                        'ID': data.id,
                        'loggedin': true,
                        'username': data.username
                    });

                    docCookies.setItem('userid', data.id);
                    docCookies.setItem('usersession', data.usersession);
                    this.setUserInterface("loggedin");
                    window.location.hash = 'checkin';
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
        $.post( this.urlRoot+"/login", userdata, _.bind(function(data) {
            if(data.loggedin) {
                this.set({
                    'ID': data.id,
                    'loggedin': true,
                    'username': data.username
                });

                docCookies.setItem('userid', data.id);
                docCookies.setItem('usersession', data.usersession);
                this.setUserInterface("loggedin");
                window.location.hash = 'checkin';
            }else{
                $(router.container.myChildView.$el).find('.error_msg').html(data.message);
            }
        },this))
        .done(function() {
        })
        .fail(function() {
        })
        .always(function() {
        });
    },

    setUserInterface: function(type) {
        if( type == "loggedin" ) {
            $('.navbar .navbar-right').html('<li><a href="/#/logout">Logout</a></li>')
        }else{
            $('.navbar .navbar-right').html('<li><a href="/#/login">Login</a></li>')
        }
    },

    getUserInventory: function() {
        $.get( this.urlRoot+'/fetchInventory/'+this.get('ID'), _.bind(function(data) {
            this.ownedItems = data.items;
            return data;
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
