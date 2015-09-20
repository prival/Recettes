if (Meteor.isServer) {

  Meteor.publish("ingredients", function() {
    return Ingredients.find();
  });
}
