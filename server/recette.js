if (Meteor.isServer) {

  Meteor.publish("recettes", function() {
    return Recettes.find();
  });

  // Meteor.methods({
  //   getRecetteByType: function(type) {
  //     console.log('test')
  //     return Recettes.find({type: type});
  //   }
  // });
}
