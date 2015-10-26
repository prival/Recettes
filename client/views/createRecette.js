if (Meteor.isClient) {
  	// This code only runs on the client

    /* Partie dataTransfer drag drop */
    // files du dataTransfer
    var files;

    function handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    function handleFileSelect(evt) {
      evt.stopPropagation();
      evt.preventDefault();

      files = evt.dataTransfer.files; // FileList object.

      // files is a FileList of File objects. List some properties.
      var output = [];
      for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');
      }
      $('#list').html('<ul>' + output.join('') + '</ul>');
    }

    Template.createRecette.rendered = function() {

      // autocompletion
      Meteor.typeahead.inject();

      var dropZone = document.getElementById('drop_zone');
      dropZone.addEventListener('dragover', handleDragOver, false);
      dropZone.addEventListener('drop', handleFileSelect, false);
  	};


    Template.createRecette.helpers({

  			titreNewRecette: function() {

  				var typeRecette = Session.get('type_recette');

  				if (typeRecette==='Apéritif') {
  					return 'Ajouter un apéritif';
  				}
  				else if (typeRecette==='Entrée') {
  					return 'Ajouter une entrée';
  				}
  				else if (typeRecette==='Plat') {
  					return 'Ajouter un plat';
  				}
  				else if (typeRecette==='Dessert') {
  					return 'Ajouter un dessert';
  				}
          else {
            Router.go('/');
          }
  			},

        ingredients: function() {
          return Ingredients.find().fetch().map(function(it){ return it.libelle; });
        }
      });


  	Template.createRecette.events({

      // affiche si ingrédient existe déjà
      /*
      'input .ingredient' : function(event){
  			Meteor.call('ingredient/findByLibelle', event.target.value, function(error, result) {
  	      if (result) {
            $(event.target).parent().parent().next().html('<span class="color-green">Ingrédient existant</span>');
  	      }
  	      else {
            $(event.target).parent().parent().next().html('');
  	      }
  			});
      },
      */

      'submit #new-recette' : function(event){
        event.preventDefault();

        var recette = {
          typeRecette: Session.get("type_recette"),
          titre: event.target.titre.value,
          description: event.target.description.value
        };

        // validation côté client
        var validatedData = Recettes.validate(recette);

        // gestion erreurs
        if (validatedData.errors) {
          $("#error-titre").html('');
          $("#error-description").html('');
          var isFocused = false;

          if (validatedData.errors['titre']) {
            $("#error-titre").html(validatedData.errors['titre']);
            isFocused = true;
            $("#titre").focus();
          }
          if (validatedData.errors['description'  ]) {
            $("#error-description").html(validatedData.errors['description']);
            if (!isFocused) {
              isFocused = true;
              $("#description").focus();
            }
          }
        }
        else {
          // enregistrement
          // ingredients
          var ingredients = $(event.target.ingredient);

          var ingredientsLibelles = [];
          var i=0;
          for (i; i<ingredients.size();i++) {
            var libelle = ingredients[i].value.trim();
            if (libelle!='') {
                ingredientsLibelles.push(libelle);
            }
          }

          Meteor.call('ingredient/findOrSaveMany', ingredientsLibelles, function(error, result) {
            if (!error) {
              recette = validatedData.recette;
              recette.ingredients = result;

              // TODO: une seule image pour l'instant...
              var file = null;
              if (files != undefined)
                var file = files[0];

              var reader = new FileReader();

              reader.onload = function(evt) {
                recette.imageUrl = this.result;

                // sauvegarde avec image
                Meteor.call("saveRecette", recette, function(error, result) {
                  if (error) {
                    alert('Erreur lors de l\'enregistrement !');
                  }
                  else {
                    alert('Recette créée !');
                    event.target.titre.value = "";
                    event.target.description.value = "";
                  }
                });
              };

              if (file != undefined)
                reader.readAsDataURL(file);
              else {
                // sauvegarde sans image
                Meteor.call("saveRecette", recette, function(error, result) {
                  if (error) {
                    alert('Erreur lors de l\'enregistrement !');
                  }
                  else {
                    alert('Recette créée !');
                    event.target.titre.value = "";
                    event.target.description.value = "";
                  }
                });
              }
            }
          });
        }
  	},

  	'click #button-add-ingredient' : function(event){
      var row = $('<tr><td></td><td style="padding:10px;"><img class="button-remove" src="/img/remove.png" style="cursor:pointer;" /></td></tr>');
      var input = $('<input class="ingredient form-control typeahead" name="ingredient" placeholder="Nouvel ingrédient" data-source="ingredients" style="width:700px;">');
      $('td:first', row).append(input);

  		$('#tbody-ingredients').append(row);

      // active l'autocompletion
      Meteor.typeahead.inject('.typeahead:last');
  	},

  	'click #button-add-etape' : function(event){
  		$('#tbody-etapes').append('<tr>'
  							+ '<td><input class="form-control" name="etape" placeholder="Nouvelle étape" style="width:700px;"></td>'
  							+ '<td style="padding:10px;"><img class="button-remove" src="/img/remove.png" style="cursor:pointer;" /></td>'
  						  + '</tr>');
  	},

  	'click .button-remove' : function(event){
  		$(event.target).parent().parent().remove();
  	}
  	});
}
