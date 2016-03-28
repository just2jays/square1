var Place = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: 'No Name',
        venue_id: ''
    },

    initialize: function(){
        this.on("change:name", function(model){
            var name = model.get("name");
        });
    },

    rename: function(newName) {
        this.set({ name: newName });
    }
});
