var InventoryView = Backbone.View.extend({
    template: JST['templates/inventory.html'],

    initialize: function(){
        this.listenTo(appUser, 'change:money', this.setMoney);
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
        variables.money = appUser.get('money');

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

    payForPrize: function() {
        $.get( 'api/Users/forcePrize/'+appUser.id, _.bind(function(data) {
            console.log(data);
            appUser.fetchUserMoney();
            //$('#foursquareModal .the-gift-reveal .prize-well').html('<div>'+data.get('prize').message+'</div>');
        },this))
        .done(function() {
        })
        .fail(function() {
        })
        .always(function() {
        }, "json");
    },

    setMoney: function() {
        this.render();
    }
});
