if (Meteor.isServer) {

  Meteor.publish("recettes", function() {
    return Recettes.find();
  });

  Meteor.methods({
    saveRecette: function(titre, description, type, binary) {
      
      Recettes.insert({
        titre: titre,
        description: description,
        type: type,
        binary: binary,
        createdAt: new Date()
      });
    },

    deleteRecette: function(id) {
      Recettes.remove(id);
    }
  });
}
