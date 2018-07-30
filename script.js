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
  console.log(recipe);
  $('.search-result-final').html(`
    <h2 class="result-title">${recipe.title}</h2>
    <div class="image-container-3">
      <img src="img/veggie-burger-4.svg" alt="a veggie burger" class="result-image">
    </div>
    <div class="info-container-2">
      <p class="info-label">Cuisine</p>
      <p class="info">American</p>
      <p class="info-label">Diet</p>
      <p class="info">Vegan, vegetarian</p>
      <p class="info-label">Prep time</p>
      <p class="info">30 min.</p>
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
