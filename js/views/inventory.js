var InventoryView = Backbone.View.extend({
    template: JST['templates/inventory.html'],

    initialize: function(){
        this.itemData = appUser.getUserInventory();
        this.render();
    },

    events: {
    },

    render: function(){

        //Pass variables in using Underscore.js Template
        var variables = this.itemData;

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});
