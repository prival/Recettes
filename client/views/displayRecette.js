if (Meteor.isClient) {
  	// This code only runs on the client

    Template.displayRecette.events({

      'click .delete' : function(){

  			if (confirm('Confirmer ?'))
  				Meteor.call('deleteRecette', this._id);
      }
  	});
}
