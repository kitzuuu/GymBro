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
