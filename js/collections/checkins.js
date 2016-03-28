var CheckinsCollection = Backbone.Collection.extend({
    model: Checkin,

    // local dev api
    //url: 'http://localhost/api/Checkins'
    // production api
    url: 'api/Checkins'
});
