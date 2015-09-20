
if (Meteor.isClient) {
	// This code only runs on the client

	Template.displayIngredients.helpers({

  	ingredients: function () {
    		return Ingredients.find();
  	}
  });

  Template.displayIngredients.events({

    'mouseenter .button-remove' : function(event){
  		$(event.target).parent().css('background-color','#ff5050');
  	},
    'mouseleave .button-remove' : function(event){
  		$(event.target).parent().css('background-color','#ffffff');
  	},
    'click .button-remove' : function(event){
  		Ingredients.remove(this._id);
      alert('Ingrédient supprimé !');
  	},
    'keyup #input-new-ingredient' : function(event){

      if (Ingredients.findOne({libelle: event.target.value})) {
        $('#alert-ingredient').css('display','inline');
				$('#submit-new-ingredient').attr('disabled', 'disabled');
      }
      else {
        $('#alert-ingredient').css('display','none');
				$('#submit-new-ingredient').remove('disabled');
      }
    },

    'submit #form-new-ingredient' : function(){

      Ingredients.insert({
  			libelle: event.target.libelle.value,
  			createdAt: new Date()
  		});

      event.target.libelle.value = "";

      return false;
    }
	});
}
