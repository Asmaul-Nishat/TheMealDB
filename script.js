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
