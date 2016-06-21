var InventoryView = Backbone.View.extend({
    template: JST['templates/inventory.html'],

    initialize: function(){
        this.listenTo(appUser.get('ownedItems'), 'change', this.setItems);
        appUser.getUserInventory(_.bind(function(inventory){
            this.itemData = inventory.items;
            this.money = inventory.money;
            this.render();
        }, this));
    },

    events: {
        "click .prizeGift": "payForPrize"
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = {};
        variables.inventoryItems = this.itemData;
        variables.money = this.money;

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        if(appUser.get('loggedin')){
            this.$el.html( template );
        }else{
            this.$el.html( '<div class="container"><div class="row"><div class="col-sm-8 col-sm-offset-2 text-center">Please Login</div></div></div>' );
            window.location.hash = 'login';
        }
    },

    setItems: function() {
        console.log('I HEAR YOU!!!!!!');
    },

    payForPrize: function() {
        $.get( this.urlRoot+'/forcePrize/'+appUser.id, _.bind(function(data) {
            if(data.loggedin) {
                this.set({
                    'ID': data.id,
                    'loggedin': true,
                    'username': data.username
                });

                docCookies.setItem('userid', data.id, new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
                docCookies.setItem('usersession', data.usersession, new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
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
    }
});
