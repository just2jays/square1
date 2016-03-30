var AppContainerView = Backbone.View.extend({
     myChildView: null,

     render: function() {
        this.$el.html(this.myChildView.$el);
        return this;
    }
});
