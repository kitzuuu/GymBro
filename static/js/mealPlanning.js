// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeDate();
    checkDateAndResetData();
    loadMeals();
    updateMacroProgress();

    // Initialize the date in localStorage if not already set
    function initializeDate() {
        const currentDate = new Date().toISOString().split('T')[0];
        const storedDate = localStorage.getItem('currentDate');

        if (!storedDate) {
            localStorage.setItem('currentDate', currentDate);
        }
    }

    // Add event listener for Nutritionix button to send data to backend
    document.getElementById('nutritionixButton').addEventListener('click', function () {
        event.preventDefault()
        const data = {
            meal: document.getElementById('nutritionixForm').value,
        };
        document.getElementById('nutritionixForm').value='';
        // Send the data to the backend using Fetch API
        fetch('/process_meal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const foodNutrition = data.food_nutrition;
                    console.log(foodNutrition)

                    // Iterate over each food item and append it to the table
                    for (let foodName in foodNutrition) {
                        const foodData = foodNutrition[foodName];
                        const meal={
                            name: foodName,
                            calories: foodData['calories'],
                            protein: foodData['protein'],
                            carbs: foodData['carbs'],
                            fat: foodData['fat']
                        }
                        saveMeal(meal);
                    }

                } else {
                    console.error('Error processing meal:', data);
                }
            })
            .catch((error) => console.error('Error:', error));
        updateMacroProgress();
    });

    // Add event listener to the "Add Meal" button
    document.getElementById('add-meal-btn').addEventListener('click', function() {
        // Get meal details from input fields
        const mealName = document.getElementById('food-name').value;
        const mealCalories = document.getElementById('meal-calories').value;
        const mealProtein = document.getElementById('meal-protein').value;
        const mealCarbs = document.getElementById('meal-carbs').value;
        const mealFat = document.getElementById('meal-fat').value;

        // Validate input
        if (mealName && mealCalories && mealProtein && mealCarbs && mealFat) {
            // Create a meal object
            const meal = {
                name: mealName,
                calories: parseFloat(mealCalories),
                protein: parseFloat(mealProtein),
                carbs: parseFloat(mealCarbs),
                fat: parseFloat(mealFat)
            };

            // Save meal to localStorage
            saveMeal(meal);

            // Clear input fields
            document.getElementById('food-name').value = '';
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

        // Capitalize the first letter of the meal name
        const capitalizedMealName = meal.name.charAt(0).toUpperCase() + meal.name.slice(1);

        row.innerHTML = `
        <td>${capitalizedMealName}</td>
        <td>${meal.calories}</td>
        <td>${meal.protein}</td>
        <td>${meal.carbs}</td>
        <td>${meal.fat}</td>
    `;

        tableBody.appendChild(row);
    }

    // Function to update macro progress based on stored meals
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
        document.getElementById('total-calories').innerText = totalCalories.toFixed(2);
        document.getElementById('total-protein').innerText = totalProtein.toFixed(2) + 'g';
        document.getElementById('total-carbs').innerText = totalCarbs.toFixed(2) + 'g';
        document.getElementById('total-fat').innerText = totalFat.toFixed(2) + 'g';
    }

    // Check if the date has changed and reset data if it's a new day
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
});
