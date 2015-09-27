Meteor.publish("ingredients", function() {
  return Ingredients.find();
});

Meteor.methods({

  saveIngredient: function(ingredient) {
    if (!validatedData.errors) {
      ingredient = ingredient.recette;
      Ingredients.insert({
        libelle: ingredient.libelle,
        createdAt: new Date()
      });
    }
  },

  deleteIngredient: function(id) {
    Ingredients.remove(id);
  }
});
