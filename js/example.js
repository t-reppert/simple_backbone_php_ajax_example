var FileStatModel = Backbone.Model.extend({
    defaults: {
        ecsfile: '',
        status: 'Not Current',
        filedate: ''
    },
    url: 'ajax/get_file_status.php'
});
var FileStatView = Backbone.View.extend({
    el: '#filestat',
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    template: _.template( $('#filestat-template').html() ),
    render: function() {
        this.status = this.model.get('status');
        if (this.status === 'Not Current') {
            var statusclass = { statusclass: 'notcurrent'};
        } else {
            var statusclass = { statusclass:'current'};
        }
        this.model.set(statusclass);
        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }
});

var filestatMod = new FileStatModel();
filestatMod.fetch();
setInterval(function() {
   filestatMod.fetch();
},10000);
var filestatView = new FileStatView({model: filestatMod});

