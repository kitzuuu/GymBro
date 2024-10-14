    // Wait for the DOM to load
    document.addEventListener('DOMContentLoaded', function() {
    initializeDate();
    checkDateAndResetData();
    loadMeals();
    updateMacroProgress();

    function initializeDate() {
    const currentDate = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('currentDate');

    if (!storedDate) {
    localStorage.setItem('currentDate', currentDate);
}
}

    // Add event listener to the "Add Meal" button
    document.getElementById('add-meal-btn').addEventListener('click', function() {
    // Get meal details from input fields
    const mealName = document.getElementById('meal-name').value;
    const mealCalories = document.getElementById('meal-calories').value;
    const mealProtein = document.getElementById('meal-protein').value;
    const mealCarbs = document.getElementById('meal-carbs').value;
    const mealFat = document.getElementById('meal-fat').value;

    // Validate input
    if (mealName && mealCalories && mealProtein && mealCarbs && mealFat) {
    // Create a meal object
    const meal = {
    name: mealName,
    calories: parseInt(mealCalories),
    protein: parseInt(mealProtein),
    carbs: parseInt(mealCarbs),
    fat: parseInt(mealFat)
};

    // Save meal to localStorage
    saveMeal(meal);

    // Clear input fields
    document.getElementById('meal-name').value = '';
    document.getElementById('meal-calories').value = '';
    document.getElementById('meal-protein').value = '';
    document.getElementById('meal-carbs').value = '';
    document.getElementById('meal-fat').value = '';
} else {
    alert('Please fill in all fields.');
}
});

    // Function to save meal to localStorage
    function saveMeal(meal) {
    // Update the current date in localStorage
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem('currentDate', currentDate);

    let meals = [];
    // Get existing meals from localStorage
    if (localStorage.getItem('meals')) {
    meals = JSON.parse(localStorage.getItem('meals'));
}
    // Add new meal
    meals.push(meal);
    // Save back to localStorage
    localStorage.setItem('meals', JSON.stringify(meals));
    // Update meal log table
    appendMealToTable(meal);
    // Update macro progress
    updateMacroProgress();
}

    // Function to load meals from localStorage and display them
    function loadMeals() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    meals.forEach(meal => {
    appendMealToTable(meal);
});
}

    // Function to append a meal to the meal log table
    function appendMealToTable(meal) {
    const tableBody = document.querySelector('#meal-log-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
                <td>${meal.name}</td>
                <td>${meal.calories}</td>
                <td>${meal.protein}</td>
                <td>${meal.carbs}</td>
                <td>${meal.fat}</td>
            `;

    tableBody.appendChild(row);
}
});
    function updateMacroProgress() {
    const meals = JSON.parse(localStorage.getItem('meals')) || [];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    meals.forEach(meal => {
    totalCalories += meal.calories;
    totalProtein += meal.protein;
    totalCarbs += meal.carbs;
    totalFat += meal.fat;
});

    // Update the DOM elements
    document.getElementById('total-calories').innerText = totalCalories;
    document.getElementById('total-protein').innerText = totalProtein + 'g';
    document.getElementById('total-carbs').innerText = totalCarbs + 'g';
    document.getElementById('total-fat').innerText = totalFat + 'g';
}

    // Call this function whenever a meal is added
    function appendMealToTable(meal) {
    // ... existing code to append the meal ...

    // Update macro progress
    updateMacroProgress();
}

    // Also call it on page load
    document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Update macro progress on page load
    updateMacroProgress();
});
    function checkDateAndResetData() {
    const currentDate = new Date().toISOString().split('T')[0];
    const storedDate = localStorage.getItem('currentDate');

    if (storedDate && storedDate !== currentDate) {
    // It's a new day, clear the meal data
    localStorage.removeItem('meals');
    // Update the stored date to the current date
    localStorage.setItem('currentDate', currentDate);
}
}
