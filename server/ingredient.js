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
      return Ingredients.insert(validatedData.ingredient);
    }
    else {
      throw new Meteor.Error('save', 'Erreur lors de l\'enregistrement.');
    }
  },

  'ingredient/findOrSaveMany': function(libelles) {
    var result = [];
    var i = 0;
    for (i; i<libelles.length;i++) {
     libelle = libelles[i];
     var ingredient = Meteor.call('ingredient/findByLibelle', libelle);
      if (ingredient) {
          result.push(ingredient._id);
      }
      else {
        var ingredient = {libelle: libelle};
        var validatedData = Ingredients.validate(ingredient);
        if (!validatedData.errors) {
          var id = Ingredients.insert(validatedData.ingredient);
          result.push(id);
        }
        else {
          throw new Meteor.Error('save', 'Erreur lors de l\'enregistrement.');
        }
      }
    }
    return result;
  },

  'ingredient/remove': function(id) {
    Ingredients.remove(id);
  },

  'ingredient/removeByLibelle': function(libelle) {
    Ingredients.remove({libelle: libelle});
  }
});
