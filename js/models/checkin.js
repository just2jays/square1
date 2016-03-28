var Checkin = Backbone.Model.extend({
    defaults: {
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
    // local dev api
    //urlRoot: 'http://localhost/api/Checkins'
    // production api
    urlRoot: 'http://worldisending.com/development/dowork/api/Checkins'
});
