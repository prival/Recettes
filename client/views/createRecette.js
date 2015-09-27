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
  			}
  	});


  	Template.createRecette.events({

      'submit #new-recette' : function(event){

          event.preventDefault();

          var recette = {
            typeRecette: Session.get("type_recette"),
            titre: event.target.titre.value,
            description: event.target.description.value
          };

          // validation côté client et serveur
          var validatedData = Recettes.validate(recette);

          if (validatedData.errors) {
            $("#error-titre").html('');
            $("#error-description").html('');
            var isFocused = false;

            if (validatedData.errors['titre']) {
              $("#error-titre").html(validatedData.errors['titre']);
              isFocused = true;
              $("#titre").focus();
            }
            if (validatedData.errors['description']) {
              $("#error-description").html(validatedData.errors['description']);
              if (!isFocused) {
                isFocused = true;
                $("#description").focus();
              }
            }
          }
          else {
            recette = validatedData.recette;
            // TODO: une seule image pour l'instant...
            var file = event.target.imageFile.files[0];

            // drop zone
            if (file == undefined && files != undefined)
              file = files[0];

            var reader = new FileReader();

            reader.onload = function(evt){

                recette.imageUrl = this.result;

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

          return false;
  	},

  	'click #button-add-ingredient' : function(event){
  		$('#tbody-ingredients').append('<tr>'
  							+ '<td><input class="form-control" name="ingredient" placeholder="Nouvel ingrédient" style="width:700px;"></td>'
  							+ '<td style="padding:10px;"><img class="button-remove" src="/img/remove.png" style="cursor:pointer;" /></td>'
  						  + '</tr>');
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
