
if (Meteor.isClient) {
	// This code only runs on the client

	Template.displayIngredients.helpers({

  	ingredients: function () {
    		return Ingredients.find();
  	}
  });

  Template.displayIngredients.events({

		// coloriage
    'mouseenter .button-remove' : function(event){
  		$(event.target).parent().css('background-color','#ff5050');
  	},
    'mouseleave .button-remove' : function(event){
  		$(event.target).parent().css('background-color','#ffffff');
  	},
		// supprime ingrédient
    'click .button-remove' : function(event){
  		Meteor.call('deleteIngredient',this._id);
      alert('Ingrédient supprimé !');
  	},
		// affiche si ingrédient existe déjà
    'keyup #libelle-ingredient' : function(event){

      if (Ingredients.findOne({libelle: event.target.value})) {
        $('#alert-ingredient').css('display','inline');
				$('#submit-new-ingredient').attr('disabled', 'disabled');
      }
      else {
        $('#alert-ingredient').css('display','none');
				$('#submit-new-ingredient').remove('disabled');
      }
    },

		// save ingrédient
    'submit #form-new-ingredient' : function(){

      event.preventDefault();

      var ingredient = {
        libelle: event.target.libelle.value
      };

			var validatedData = Ingredients.validate(ingredient);

			if (validatedData.errors) {
				$("#alert-ingredient").html('');
				var isFocused = false;

				if (validatedData.errors['libelle']) {
					$("#alert-ingredient").html(validatedData.errors['libelle']);
					isFocused = true;
					$("#libelle-ingredient").focus();
				}
			}
			else {
				ingredient = validatedData.ingredient;
				Meteor.call('saveIngredient', ingredient, function(error, result) {
					if (error) {
						alert('Erreur lors de l\'enregistrement !');
					}
					else {
						event.target.libelle.value = "";
					}
				});
			}
    }
	});
}
