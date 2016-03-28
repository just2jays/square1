var CheckinsCollection = Backbone.Collection.extend({
    model: Checkin,

    // local dev api
    //url: 'http://localhost/api/Checkins'
    // production api
    url: 'http://worldisending.com/development/dowork/api/Checkins'
});
