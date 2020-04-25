const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

async function fetchRecepies(query) {
  const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  const data = await res.json();
  return data;
}

async function fetchAndDisplay(query) {
  //   turn the form off
  form.submit.disabled = true;
  //   submit the search
  console.log(form.query.value);
  const recipes = await fetchRecepies(query);
  form.submit.disabled = false;
  displayRecepies(recipes.results);
}

async function handleSubmit(event) {
  event.preventDefault();
  fetchAndDisplay(form.query.value);
}

function displayRecepies(recipes) {
  console.log(recipes);
  const html = recipes.map(
    recipe => `<div class="recipe">
  <h2>${recipe.title}</h2>
  <p>${recipe.ingredients}</p>
  ${recipe.thumbnail &&
    `<img src = "${recipe.thumbnail}" alt = "${recipe.title}"/>`}
    <div>
    <a href="${recipe.href}" target="_blank">View Recipe -></a>
    </div>
  </div>`
  );
  recipesGrid.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);
// display recepies on page load
fetchAndDisplay('pizza');
