var loginView = Backbone.View.extend({
    template: JST['templates/login.html'],

    initialize: function(){
        this.render();
    },

    events: {
        "submit #userLoginForm": "loginUser"
    },

    render: function(){
        //Pass variables in using Underscore.js Template
        var variables = { search_label: "Here Now" };

        // Compile the template using underscore
        var template = this.template(variables);

        // Load the compiled HTML into the Backbone "el"
        this.$el.html( template );
    },

    loginUser: function(e){
        e.preventDefault();

        $(router.container.myChildView.$el).find('.error_msg').html('');

        var userData = {
            username: $(e.currentTarget).find('#inputUsername').val(),
            password: $(e.currentTarget).find('#inputPassword').val()
        };

        appUser.userLogin(userData);
    }
});
