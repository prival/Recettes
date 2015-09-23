
Recettes = new Mongo.Collection("recettes");
Ingredients = new Mongo.Collection("ingredients");

if (Meteor.isClient) {
  	// This code only runs on the client

		Meteor.subscribe("recettes");
		Meteor.subscribe("ingredients");

	Template.mainLayout.rendered = function() {
	  // menu de gauche
		$(function() {
			$(this).find('li').not('.active').has('ul').children('ul').addClass('collapse');

			$(this).find('li').has('ul').children('a').on('click', function (e) {
					e.preventDefault();

					$(this).parent('li').toggleClass('active').children('ul').collapse('toggle');

					if ($toggle) {
							$(this).parent('li').siblings().removeClass('active').children('ul.in').collapse('hide');
					}
			});
		});
	};

	Template.mainLayout.helpers({

		// populate le menu
  	aperitifs: function () {
    		return Recettes.find({type: "Apéritif"});
  	},
  	entrees: function () {
    		return Recettes.find({type: "Entrée"});
  	},
  	plats: function () {
    		return Recettes.find({type: "Plat"});
  	},
  	desserts: function () {
    		return Recettes.find({type: "Dessert"});
  	}
  });

	// routes
  Template.mainLayout.events({
		"click #btn-aperitif": function (event) {

			Session.set('type_recette', 'Apéritif');
			Router.go('createRecette');
		},
		"click #btn-entree": function (event) {

			Session.set('type_recette', 'Entrée');
			Router.go('createRecette');
		},
		"click #btn-plat": function (event) {

			Session.set('type_recette', 'Plat');
			Router.go('createRecette');
		},
		"click #btn-dessert": function (event) {

			Session.set('type_recette', 'Dessert');
			Router.go('createRecette');
		},
		"click #btn-ingredients": function (event) {

			Router.go('displayIngredients');
		}
	});
}
