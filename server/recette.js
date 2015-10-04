Meteor.publish("recettes", function() {
  return Recettes.find();
});

Meteor.methods({

  saveRecette: function(recette) {
    var validatedData = Recettes.validate(recette);

    if (!validatedData.errors) {
      recette = validatedData.recette;
      return Recettes.insert({
        titre: recette.titre,
        description: recette.description,
        type: recette.typeRecette,
        imageUrl: recette.imageUrl,
        createdAt: new Date()
      });
    }
  },

  deleteRecette: function(id) {
    Recettes.remove(id);
  }
});
