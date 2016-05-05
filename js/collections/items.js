var ItemsCollection = Backbone.Collection.extend({
    model: Item,

    // local dev api
    //url: 'http://localhost/api/Checkins'
    // production api
    url: 'api/Items'
});
