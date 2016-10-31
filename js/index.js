recipes = [];


Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

//function newRecipe() {  
//}

function saveRecipe(form) {
  var name = form.recipeName.value;
  var ing = form.ingredients.value;

  recipes.push({name, ing});

  saveRecipes();
  loadRecipes();
}

function editRecipe(form, nr) {
  var name = form.recipeName.value;
  var ing = form.ingredients.value;

  recipes[nr] = {name, ing};

  saveRecipes();
  loadRecipes();
}

function deleteRecipe(nr) {
  recipes.splice(nr, 1);

  saveRecipes();
  loadRecipes();
}

function loadRecipes() {
  recipes = localStorage.getObj("recipes");

  var html = "";

  if ((recipes != null) && (recipes != "")) {
    // Fill accordion with recipes
    for (let i = 0; i < recipes.length; i++) {
      html += '<div class="panel panel-default">';
      html += '  <div class="panel-heading">';
      html += '    <button class="btn btn-accordion" data-toggle="collapse" data-parent="#accordion" data-target="#collapse' + (i+1) + '">' ;
      html +=        recipes[i]["name"];
      html += '    </button>';
      html += '  </div>';
      html += '  <div id="collapse' + (i+1) + '" class="panel-collapse collapse">';
      html += '    <div class="panel-body">';
      html +=        recipes[i]["ing"];
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
    }
  } else {
    // Use placeholder when no recipes on file
    html += '<div class="panel panel-default">';
    html += '  <div class="panel-heading">';
    html += '    <button class="btn btn-accordion" data-toggle="collapse" data-parent="#accordion" data-target="#collapse0">' ;
    html +=        'No Recipes currently on File';
    html += '    </button>';
    html += '  </div>';
    html += '  <div id="collapse0" class="panel-collapse collapse">';
    html += '    <div class="panel-body">';
    html +=        'Click "New Recipe" button to add recipes to the list.';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    recipes = [];
  }

  $("#accordion").html(html);

}

function saveRecipes() {
  localStorage.setObj("recipes", recipes);
}


$(document).ready( function(e) {
  $("#btnNew").on("click", function() {
    $('#myModal').find('button[name="btnSubmit"]').attr("onclick", "saveRecipe(this.form)");
    $("#btnSubmit").html("Add");
    $('#myModal').backdrop = "static";
    $('#myModal').keyboard="false";
    $('#myModal').modal();
  })

  $("#btnEdit").on("click", function() {
    var recipeNumber = -1;

    if (recipes !== null) {
      for (let i = 0; i < recipes.length; i++) {
        if ($('#collapse' + (i+1)).hasClass("in")) {
          recipeNumber = i;
          break;
        }
      }
    }

    if (recipeNumber !== -1) {
      $('#myModal').find('button[name="btnSubmit"]').attr("onclick", "editRecipe(this.form," + recipeNumber + ")");

      $('#myModal').find('input[id="recipeName"]').attr("value",recipes[recipeNumber].name);
      $('#myModal').find('input[id="ingredients"]').attr("value",recipes[recipeNumber].ing);

      $("#btnSubmit").html("Update");
      $('#myModal').backdrop = "static";
      $('#myModal').keyboard="false";
      $('#myModal').modal();
    }
  })

  $("#btnDelete").on("click", function() {
    var recipeNumber = -1;

    if (recipes !== null) {
      for (let i = 0; i < recipes.length; i++) {
        if ($('#collapse' + (i+1)).hasClass("in")) {
          recipeNumber = i;
          break;
        }
      }
    }

    if (recipeNumber !== -1) {
      deleteRecipe(recipeNumber);
    }
  })

  loadRecipes();
});
