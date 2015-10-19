
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

Router.route('/editRecette/:_id', function () {

this.render('editRecette', {
  data: function() {
    return Recettes.findOne({_id: this.params._id});
  }
});
},{
  name: 'editRecette'
});

Router.route('/createRecette', function () {
  this.render('createRecette');
});

Router.route('/displayIngredients', function () {
  this.render('displayIngredients');
});
