// const RECIPE_COMPLEX_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex";

$('.search-form').submit(function (event) {
	event.preventDefault();
	$('#page-1').hide();
	$('#page-2').show();
	let query = $('#query').val();
	getDataFromApi(query);
})

$('.search-result').click(function(event) {
	$('#page-2').hide();
	$('#page-3').show();
})

function getDataFromApi(query) {
  const settings = {
    url: RECIPE_COMPLEX_URL,
    data: {
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
  console.log(data);
  // const results = data.items.map((item, index) => renderResult(item));
  // $('.js-search-results').html(results);
}

function renderResult(result) {
  console.log(result);
  return `
  <div class="search-result">
  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
    <h3>${result.snippet.title}</h3>
    <img src="${result.snippet.thumbnails.medium.url}" class="yt-thumbnail">
  </a>
  <p>${result.snippet.description}</p>
  </div>
  `;
}
