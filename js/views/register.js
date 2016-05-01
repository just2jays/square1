var RegisterView = Backbone.View.extend({
    template: JST['templates/register.html'],

    initialize: function(){
        this.render();
    },

    events: {

    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = { search_label: "Here Now" };

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    }
});
