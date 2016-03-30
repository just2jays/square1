var AppContainerView = Backbone.View.extend({
     myChildView: null,

     render: function() {
        //this.$el.html('<div id=""></div><div class="">');

        this.$el.html(this.myChildView.$el);
        return this;
    }
});
