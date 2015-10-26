
Recettes = new Mongo.Collection("recettes");
Ingredients = new Mongo.Collection("ingredients");

// valide le bon format d'une recette
Recettes.validate = function(recette) {
	recette.titre = recette.titre.trim();
	recette.description = recette.description.trim();
	recette.createdAt = new Date();

	var errors = {};
	if (!recette.titre)
		errors['titre'] = 'Le titre de la recette ne doit pas être vide.'
	else if (recette.titre.length > 200)
		errors['titre'] = 'Le titre ne doit pas excéder 200 caractères.'

	if (recette.description.length > 1000)
		errors['description'] = 'La description ne doit pas excéder 1000 caractères.'

	return { errors: _.isEmpty(errors) ? undefined : errors, recette: recette };
}

// valide le bon format d'un ingrédient
Ingredients.validate = function(ingredient) {
	ingredient.libelle = ingredient.libelle.trim();
	ingredient.createdAt = new Date();

	var errors = {};
	if (!ingredient.libelle)
		errors['titre'] = 'Le libelle de l\'ingrédient ne doit pas être vide.'
	else if (ingredient.libelle.length > 200)
		errors['titre'] = 'Le libelle ne doit pas excéder 200 caractères.'

	// faire Meteor.call findOne existe déjà...

	return { errors: _.isEmpty(errors) ? undefined : errors, ingredient: ingredient };
}

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
		"click": function (event) {
			if (Session.get('not_saved')==true) {
				if (confirm('Annuler la modification ?')) {
					Session.set('not_saved', undefined);
					event.preventDefault();
				}
			}
		},
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
