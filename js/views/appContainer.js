var AppContainerView = Backbone.View.extend({
     myChildView: null,

     render: function() {
        this.$el.append(this.myChildView.$el);
        return this;
    }
});
