var InventoryView = Backbone.View.extend({
    template: JST['templates/inventory.html'],

    initialize: function(){
        this.listenTo(appUser.get('ownedItems'), 'change', this.setItems);
        appUser.getUserInventory(_.bind(function(items){
            this.itemData = items;
            this.render();
        }, this));
    },

    events: {
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = this.itemData;

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
    }
});
