document.addEventListener("DOMContentLoaded", function () {
    // Get all workout plans
    const workoutPlans = {
        'plan1': { name: 'Intensive-Legs (High Intensity)', intensity: 'high', goal: 'strength', time: 45 },
        'plan2': { name: 'Upper Body Strength (Medium Intensity)', intensity: 'medium', goal: 'strength', time: 30 },
        'plan3': { name: 'Full Body Circuit (High Intensity)', intensity: 'high', goal: 'overall', time: 30 },
        'plan4': { name: 'Lower Body Endurance (Medium Intensity)', intensity: 'medium', goal: 'endurance', time: 45 },
        'plan5': { name: 'Shoulder and Arms (Medium Intensity)', intensity: 'medium', goal: 'strength', time: 15 }
    };

    // Function to get a matching workout based on user input
    function getMatchingWorkout(userInput) {
        const filteredWorkouts = [];
        for (const planId in workoutPlans) {
            const plan = workoutPlans[planId];

            // Match based on intensity, goal, and time
            if (
                plan.intensity === userInput.intensity &&
                plan.goal === userInput.goal &&
                plan.time <= userInput.time
            ) {
                filteredWorkouts.push(planId);
            }
        }

        // If no exact match, fallback to any plan that matches intensity and goal
        if (filteredWorkouts.length === 0) {
            for (const planId in workoutPlans) {
                const plan = workoutPlans[planId];
                if (plan.intensity === userInput.intensity && plan.goal === userInput.goal) {
                    filteredWorkouts.push(planId);
                }
            }
        }

        // If still no match, just match on intensity
        if (filteredWorkouts.length === 0) {
            for (const planId in workoutPlans) {
                const plan = workoutPlans[planId];
                if (plan.intensity === userInput.intensity) {
                    filteredWorkouts.push(planId);
                }
            }
        }

        // If there are no matches at all, return a fallback plan
        if (filteredWorkouts.length === 0) {
            return 'plan1';  // Fallback to the first plan if no match found
        }

        // Randomly select from the matched plans if more than one matches
        const randomIndex = Math.floor(Math.random() * filteredWorkouts.length);
        return filteredWorkouts[randomIndex];
    }

    // Handle form submission from the questionnaire
    const form = document.getElementById('questionnaireForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission behavior

        // Get user input from the form
        const userInput = {
            intensity: document.getElementById('intensity').value,
            goal: document.getElementById('goal').value,
            time: parseInt(document.getElementById('time').value, 10) // Convert time to integer
        };

        // Get the matching workout
        const selectedPlanId = getMatchingWorkout(userInput);
        const selectedWorkoutText = workoutPlans[selectedPlanId].name;

        // Display the selected workout inside the modal
        const resultDiv = document.getElementById('recommendation-result');
        resultDiv.innerText = `Recommended Workout: ${selectedWorkoutText}`;
        resultDiv.style.display = 'block'; // Show the result
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Get all workout plans
    const workoutPlans = document.querySelectorAll(".workout-plan");

    workoutPlans.forEach(function (plan) {
        const checkboxes = plan.querySelectorAll("input[type='checkbox']");

        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener("change", function () {
                // Check if all checkboxes are checked
                if (Array.from(checkboxes).every(checkbox => checkbox.checked)) {
                    // Trigger confetti animation
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });

                    // Change the background color of the workout plan to green
                    plan.style.backgroundColor = "green";
                }
            });
        });
    });
});