const RECIPE_COMPLEX_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";
let recipes = [];

$('.search-form').submit(function (event) {
	event.preventDefault();
	$('#page-1').hide();
	$('#page-2').show();
	let query = $('#query').val();
	getDataFromApi(query);
})

$('.search-results').on('click', '.result', function(event) {
  let selectedIndex = $(event.currentTarget).attr('data-index');
  let recipe = recipes[selectedIndex];
  const ingredients = recipe.missedIngredients.map((item, index) => item.name);
  const instructions = recipe.analyzedInstructions['0'].steps.map((item, index) => `<li>${item.step}</li>`)
  console.log(recipe);
  $('.search-result-final').html(`
    <h2 class="result-title">${recipe.title}</h2>
    <div class="image-container-3">
      <img src=${recipe.image} alt="search result image" class="result-image">
    </div>
    <div class="info-container-2">
      <p class="info-label">Cuisine</p>
      <p class="info">${recipe.cuisines.join(', ')}</p>
      <p class="info-label">Diet</p>
      <p class="info">${recipe.diets.join(', ')}</p>
      <p class="info-label">Ready in</p>
      <p class="info">${recipe.readyInMinutes} min.</p>
    </div>
    <div class="clear"></div>
  `)
  $('.ingredients-steps-container').html(`
    <div class="ingredients-container">
      <div class="ingredients-heading-container">
        <h2 class="ingredients-heading">Ingredients</h2>
      </div>
      <div class="ingredients-content-container">
        <ul class="ingredients-content">
          <p>${ingredients.join(',  ')}</p>
        </ul>
      </div>
    </div>

    <div class="steps-container">
      <div class="steps-heading-container">
        <h2 class="steps-heading">Steps</h2>
      </div>
      <div class="steps-content-container">
        <ol class="steps-content">
          ${instructions.join(' ')}
        </ol>
      </div>
    </div>
    <div class="clear"></div>
  `)
	$('#page-2').hide();
	$('#page-3').show();
})

function getDataFromApi(query) {
  const settings = {
    url: RECIPE_COMPLEX_URL,
    data: {
      fillIngredients: true,
      instructionsRequired: true,
      addRecipeInformation: true,
      query: query
    },
    headers: {
    	"X-Mashape-Key": "a96SMmdnhnmshTzHVgXC0ceqjSvQp1zKfCYjsnRMJbRDUrkCzS",
    	"X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
    },
    dataType: 'json',
    type: 'GET',
    success: displayRecipeSearchData,
    error: function(err) {
    	console.log(err);
    }
  };
  $.ajax(settings);
}

function displayRecipeSearchData(data) {
  recipes = data.results;
  console.log(data);
  const results = recipes.map((item, index) => renderResult(item, index));
  $('.search-results').html(results);
}

function renderResult(result, index) {
  // console.log(result);
  const ingredients = result.missedIngredients.map((item, index) => item.name)
  return `
    <div data-index="${index}" class="result">
      <h2 class="result-title">${result.title}</h2>
        <div class="image-container-2">
          <img src=${result.image} alt="search result image" class="result-image">
        </div>
        <div class="info-container">
          <p><span class="info-label">Cuisine:</span> ${result.cuisines.join(', ')}</p>
          <p><span class="info-label">Diet:</span> ${result.diets.join(', ')}</p>
          <p><span class="info-label">Ingredients:</span> ${ingredients.join(', ')}</p>
          <p><span class="info-label">Ready in:</span> ${result.readyInMinutes} min.</p>
        </div>
        <div class="clear"></div>
    </div>
  `;
}
