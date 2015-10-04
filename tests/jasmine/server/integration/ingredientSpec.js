describe('Ingredients', function() {

    var ingredient = {libelle: 'pomme'};
    var ingredientEmpty = {libelle: ''};
    var ingredientEmptyTrim = {libelle: '      '};

    /**
    * Teste un enregistrement en vérifiant que l'insert est bien appelé.
    */
    it('save', function() {
      spyOn(Ingredients, 'insert').and.returnValue('1');
      Meteor.call('ingredient/save', ingredient, function(error, result) {
        expect(error).toBe(undefined);
        expect(result).not.toBe(undefined);
        expect(result).not.toBe(null);
        expect(Ingredients.insert).toHaveBeenCalled();
      });
    });

    /**
    * Interdiction d'enregistrer un ingrédient dont le libellé est vide.
    */
    it('save empty', function() {
      spyOn(Ingredients, 'insert').and.returnValue('1');
      Meteor.call('ingredient/save', ingredientEmpty, function(error, result) {
        expect(error).not.toBe(undefined);
        expect(result).toBe(undefined);
        expect(Ingredients.insert).not.toHaveBeenCalled();
      });
    });

    /**
    * Interdiction d'enregistrer un ingrédient dont le libellé est constitué uniquement d'espaces.
    */
    it('save empty trim', function() {
      spyOn(Ingredients, 'insert').and.returnValue('1');
      Meteor.call('ingredient/save', ingredientEmptyTrim, function(error, result) {
        expect(error).not.toBe(undefined);
        expect(result).toBe(undefined);
        expect(Ingredients.insert).not.toHaveBeenCalled();
      });
    });

    /**
    * Teste findOrSave dans le cas find.
    */
    // it('findOrSave cas find', function() {
    //   spyOn(Ingredients, 'insert').and.callThrough();
    //   Meteor.call('ingredient/findOrSave', 'pomme', function(error, result) {
    //     expect(error).toBe(undefined);
    //     expect(result).not.toBe(undefined);
    //     expect(result).not.toBe(null);
    //     expect(Ingredients.insert).not.toHaveBeenCalled();
    //   });
    // });

    /**
    * Teste findOrSave dans le cas save.
    */
    // it('findOrSave cas save', function() {
    //   spyOn(Ingredients, 'insert').and.callThrough();
    //   Meteor.call('ingredient/findOrSave', 'poire', function(error, result) {
    //     expect(error).toBe(undefined);
    //     expect(result).not.toBe(undefined);
    //     expect(result).not.toBe(null);
    //     expect(Ingredients.insert).toHaveBeenCalled();
    //   });
    // });

    /**
    * Teste findOrSave dans le cas save empty.
    */
    // it('findOrSave cas save', function() {
    //   spyOn(Ingredients, 'insert').and.callThrough();
    //   Meteor.call('ingredient/findOrSave', '', function(error, result) {
    //     expect(error).not.toBe(undefined);
    //     expect(result).toBe(undefined);
    //     expect(Ingredients.insert).not.toHaveBeenCalled();
    //   });
    // });

    /**
    * Teste la récupération d'un ingrédient non existant.
    */
    // it('findByLibelle non exists', function() {
    //   Meteor.call('ingredient/findByLibelle', 'fraise', function(error, result) {
    //     expect(error).toBe(undefined);
    //     expect(result).toBe(undefined);
    //   });
    // });

    /**
    * Teste la récupération d'un ingrédient existant.
    */
    // it('findByLibelle exists', function() {
    //   Meteor.call('ingredient/findByLibelle', 'pomme', function(error, result) {
    //     expect(error).toBe(undefined);
    //     expect(result).not.toBe(undefined);
    //   });
    // });

    /**
    * Teste la suppression.
    */
    it('removeByLibelle', function() {
      spyOn(Ingredients, 'remove').and.callThrough();
      Meteor.call('ingredient/removeByLibelle', 'pomme', function(error, result) {
        expect(Ingredients.remove).toHaveBeenCalled();
      });
      Meteor.call('ingredient/removeByLibelle', 'poire', function(error, result) {
        expect(Ingredients.remove).toHaveBeenCalled();
      });
      Meteor.call('ingredient/removeByLibelle', '', function(error, result) {
        expect(Ingredients.remove).toHaveBeenCalled();
      });
    });
});
