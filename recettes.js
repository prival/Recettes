
Recettes = new Mongo.Collection("recettes");

if (Meteor.isClient) {
  	// This code only runs on the client

	var	titreNewRecette;

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

		// menu
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

  Template.mainLayout.events({
		"click #btn-aperitif": function (event) {

			Session.set('type_recette', 'Apéritif');
			Router.go('addRecette');
		},
		"click #btn-entree": function (event) {

			Session.set('type_recette', 'Entrée');
			Router.go('addRecette');
		},
		"click #btn-plat": function (event) {

			Session.set('type_recette', 'Plat');
			Router.go('addRecette');
		},
		"click #btn-dessert": function (event) {

			Session.set('type_recette', 'Dessert');
			Router.go('addRecette');
		}
	});


	Template.addRecette.helpers({

			titreNewRecette: function() {

				var typeRecette = Session.get('type_recette');

				if (typeRecette==='Apéritif') {
					return 'Ajouter un apéritif';
				}
				else if (typeRecette==='Entrée') {
					return 'Ajouter une entrée';
				}
				else if (typeRecette==='Plat') {
					return 'Ajouter un plat';
				}
				else if (typeRecette==='Dessert') {
					return 'Ajouter un dessert';
				}
			}
	});

	Template.addRecette.events({

    'submit .new-recette' : function(event){

		var typeName = Session.get("type_recette");

		Recettes.insert({
			titre: event.target.titre.value,
			description: event.target.description.value,
			type: typeName,
			createdAt: new Date()
		});

		alert('Recette créée !');

    event.target.titre.value = "";
		event.target.description.value = "";

    return false;
    }
	});


	Template.Recette.events({

    'click .delete' : function(){

			if (confirm('Confirmer ?'))
				Recettes.remove(this._id);
    }
	});
}


if (Meteor.isServer) {
  	Meteor.startup(function () {
    	// code to run on server at startup
  	});
}
