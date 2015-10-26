if (Meteor.isClient) {
  	// This code only runs on the client
$(window).on('unload', function() {
         alert('wadsfghfj');
    });
    Template.displayRecette.helpers({
        ingredientsLibelles: function() {
          var result = [];
          var i = 0;
          for (i;i<this.ingredients.length;i++) {
            var ingredient = Ingredients.findOne({_id: this.ingredients[i]});
            result.push(ingredient.libelle);
          }
          return result;
        },

        isDescriptionEmpty: function (description) {
          var isEmpty = (description === undefined
            || description === null
            || description.trim() === '');
          return isEmpty;
        },

        isImagesEmpty: function (imageUrl) {
          var isEmpty = (imageUrl === undefined
            || imageUrl === null
            || imageUrl.trim() === '');
          return isEmpty;
        }
      });

    Template.displayRecette.events({

      'click #button-delete' : function(){
  			if (confirm('Confirmer ?'))
  				Meteor.call('deleteRecette', this._id);
      },

      'click #button-edit' : function(){
        Session.set('not_saved', true);
        $('#button-edit').detach();

        var widthTitre = $('#label-titre').width();
        var textTitre = $('#label-titre').html();
        $('#label-titre').replaceWith('<input class="form-control input-lg" id="input-titre" name="titre" value="'+textTitre+'" style="width:'+widthTitre+'px" />');

        var widthDescription = $('#label-description').width();
        var heightDescription = $('#label-description').height();
        var textDescription = $('#label-description').html();
        $('#label-description').replaceWith('<textarea class="form-control" id="description" name="description"'
                  +' style="width:'+widthDescription+'px;height:'+heightDescription+'">'+textDescription+'</textarea>');

		    // bouton enregistrer
		    $('#button-delete').replaceWith('<button type="submit" id="button-save" class="btn btn-success btn-lg sharp">Enregistrer</button>');
      },

      'click #button-save' : function(){
  			alert(this._id);
      },
  	});
}
