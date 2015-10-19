if (Meteor.isClient) {
  	// This code only runs on the client

    Template.displayRecette.events({

      'click .delete' : function(){
  			if (confirm('Confirmer ?'))
  				Meteor.call('deleteRecette', this._id);
      },

      'click #button-edit' : function(){
        $('#button-edit').detach();

        var widthTitre = $('#label-titre').width();
        var textTitre = $('#label-titre').html();
        $('#label-titre').replaceWith('<input class="form-control" id="input-titre"name="titre" value="'+textTitre+'" style="width:'+widthTitre+'px" />');

        var widthDescription = $('#label-description').width();
        var heightDescription = $('#label-description').height();
        var textDescription = $('#label-description').html();
        $('#label-description').replaceWith('<textarea class="form-control" id="description" name="description"'
                  +' style="width:'+widthDescription+'px;height:'+heightDescription+'">'+textDescription+'</textarea>');
  			// Router.go('editRecette', {_id: this._id});
      }
  	});
}
