
Recettes = new Mongo.Collection("recettes");

if (Meteor.isClient) {
  	// This code only runs on the client
  
	Template.body.helpers({
		// variable recettes
    	recettes: function () {
      		return Recettes.find({});
    	}
  	});


    Template.body.events({
  		"submit .new-recette": function (event) {
    		// ajout recette

			var titre = event.target.titre.value;

			Recettes.insert({
		  		titre: titre,
		  		createdAt: new Date() // current time
			});

			// Clear form
			event.target.titre.value = "";

			// Prevent default form submit
			return false;
  		}
	});
}

if (Meteor.isServer) {
  	Meteor.startup(function () {
    	// code to run on server at startup
  	});
}
