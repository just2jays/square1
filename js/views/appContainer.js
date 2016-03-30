var ContainerView = Backbone.View.extend({
     myChildView: null,

     render: function() {
        this.$el.html('<div id=""></div><div class="">');

        this.$el.append(this.myChildView.$el);
        return this;
    }
});
