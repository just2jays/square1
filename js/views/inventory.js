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
        "click .prizeGift": "openPrizeModal",
        "click .the-gift": "payForPrize"
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
        $('#payForPrizeModal .the-gift-reveal .prize-well').html('');
        $('#payForPrizeModal .the-gift-reveal .money-well').html('');
        $('#payForPrizeModal .the-gift-cover .the-gift').addClass('animated rotateOut');
        $.get( 'api/Utilities/forcePrize/'+appUser.id, _.bind(function(data) {
            $('#payForPrizeModal .modal-header h4').html('WOW! Nice find!');
            $('#payForPrizeModal .the-gift-reveal .prize-well').html('<div class="prizeBox"><img src="'+data.prize.item.image+'" /><div class="item-name">'+data.prize.item.name+' #'+data.prize.item.unique+'</div></div>');
            $('#payForPrizeModal .the-gift-reveal .money-well').html('<div>'+data.prize.money+'</div>');
            $('#payForPrizeModal .the-gift-cover').fadeOut();
            $('#payForPrizeModal .the-gift-reveal').fadeIn();
        },this))
        .done(function() {
        })
        .fail(function() {
        })
        .always(function() {
        }, "json");
    },

    openPrizeModal: function() {
        $('#payForPrizeModal').on('hidden.bs.modal', function () {
            appUser.getUserInventory(function() {
                appUser.fetchUserMoney();
            });
        });
        $('#payForPrizeModal').modal();
    },

    setMoney: function() {
        appUser.getUserInventory(_.bind(function(inventory){
            this.itemData = inventory.items;
            this.money = inventory.money;
            this.render();
        }, this));
    }
});
