document.addEventListener("DOMContentLoaded", function () {
    // Get all workout plans
    const workoutPlans = document.querySelectorAll(".workout-plan");

    const workoutWeights = {
        'plan1': 0.2, // Intensive-Legs (High Intensity)
        'plan2': 0.2, // Upper Body Strength (Medium Intensity)
        'plan3': 0.3, // Full Body Circuit (High Intensity)
        'plan4': 0.15, // Lower Body Endurance (Medium Intensity)
        'plan5': 0.15  // Shoulder and Arms (Medium Intensity)
    };

    // Function to get a random workout based on weights
    function getRandomWorkout(weights) {
        let sum = 0;
        let random = Math.random();

        for (const plan in weights) {
            sum += weights[plan];
            if (random <= sum) {
                return plan; // Return selected plan
            }
        }
        // Fallback to the last workout if something goes wrong
        return Object.keys(weights)[Object.keys(weights).length - 1];
    }

    // Workout names for display
    const workoutNames = {
        'plan1': 'Intensive-Legs (High Intensity)',
        'plan2': 'Upper Body Strength (Medium Intensity)',
        'plan3': 'Full Body Circuit (High Intensity)',
        'plan4': 'Lower Body Endurance (Medium Intensity)',
        'plan5': 'Shoulder and Arms (Medium Intensity)'
    };

    // Handle form submission from the questionnaire
    const form = document.getElementById('questionnaireForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        const selectedPlanId = getRandomWorkout(workoutWeights);
        const selectedWorkoutText = workoutNames[selectedPlanId];

        // Display the selected workout inside the modal
        const resultDiv = document.getElementById('recommendation-result');
        resultDiv.innerText = `Recommended Workout: ${selectedWorkoutText}`;
        resultDiv.style.display = 'block'; // Show the result
    });
});
