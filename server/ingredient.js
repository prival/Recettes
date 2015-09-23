if (Meteor.isServer) {

  Meteor.publish("ingredients", function() {
    return Ingredients.find();
  });

  Meteor.methods({
    saveIngredient: function(libelle) {
      console.log('test');
      Ingredients.insert({
        libelle: libelle,
        createdAt: new Date()
      });
    },

    deleteIngredient: function(id) {
      Ingredients.remove(id);
    }
  });
}
