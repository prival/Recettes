
Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.route('/', function () {
  this.render('welcome');
});

Router.route('/displayRecette/:_id', function () {

this.render('displayRecette', {
  data: function() {
    return Recettes.findOne({_id: this.params._id});
  }
});
},{
  name: 'displayRecette'
});

Router.route('/createRecette', function () {
  this.render('createRecette');
});

Router.route('/displayIngredients', function () {
  this.render('displayIngredients');
});
