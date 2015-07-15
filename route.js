
Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
  this.render('firstPage');
});

Router.route('/addRecette', function () {
  this.render('addRecette');
});

Router.route('/recette/:_id', function () {

this.render('Recette', {
  data: function() {
    return Recettes.findOne({_id: this.params._id});
  }
});
},{
  name: 'recette'
});