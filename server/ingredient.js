Meteor.publish("ingredients", function() {
  return Ingredients.find();
});

Meteor.methods({

  /**
  * Recherche par libellé.
  */
  'ingredient/findByLibelle': function(libelle) {
    return Ingredients.findOne({libelle: libelle});
  },

  'ingredient/save': function(ingredient) {
    var validatedData = Ingredients.validate(ingredient);

    if (!validatedData.errors) {
      return Ingredients.insert({
        libelle: ingredient.libelle,
        createdAt: new Date()
      });
    }
    else {
      throw new Meteor.Error('save', 'Erreur lors de l\'enregistrement.');
    }
  },

  'ingredient/findOrSave': function(libelle) {
     var result = Meteor.call('ingredient/findByLibelle', libelle);
      if (result) {
          return result._id;
      }
      else {
        return Ingredients.insert({
          libelle: libelle,
          createdAt: new Date()
        });
      }
  },

  'ingredient/remove': function(id) {
    Ingredients.remove(id);
  },

  'ingredient/removeByLibelle': function(libelle) {
    Ingredients.remove({libelle: libelle});
  }
});
