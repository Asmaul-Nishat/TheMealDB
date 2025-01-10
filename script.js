const mealSearch = document.getElementById('mealSearch');
const mealResults = document.getElementById('mealResults');
const blogCards = document.querySelectorAll('.blog-card');
let allMeals = [];
let displayedMeals = [];

// Function to hide or show the blog cards based on search
function toggleBlogCards(query) {
    if (query.trim() !== '') {
        blogCards.forEach(card => card.style.display = 'none');
    } else {
        blogCards.forEach(card => card.style.display = 'block');
    }
}
// Search event listener
mealSearch.addEventListener('input', async function() {
    const query = mealSearch.value;
    toggleBlogCards(query);
    if (query.trim() !== '') {
        await fetchMeals(query);
    } else {
        mealResults.innerHTML = '';
    }
});

// Fetch meals from API
async function fetchMeals(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    allMeals = data.meals || [];
    displayedMeals = allMeals.slice(0, 5);
    renderMeals();
}
/ Render meals to the results div
function renderMeals() {
    mealResults.innerHTML = '';
    if (displayedMeals.length === 0) {
        mealResults.innerHTML = `<p>No meals found.</p>`;
        return;
    }

    displayedMeals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
            <p><strong>Title:</strong> ${meal.strCategory}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 150)}...</p>
        `;
        mealResults.appendChild(mealCard);
    });

    if (allMeals.length > 5) {
        const showAllButton = document.createElement('button');
        showAllButton.classList.add('show-all-btn');
        showAllButton.textContent = 'SHOW ALL';
        showAllButton.addEventListener('click', showAllMeals);
        mealResults.appendChild(showAllButton);
    }
}


