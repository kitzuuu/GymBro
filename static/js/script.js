// JavaScript to automatically save user input
document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const inputs = document.querySelectorAll('input[type="radio"], input[type="number"]');

    inputs.forEach(input => {
        input.addEventListener('change', function() {
            // Save input value in local storage
            if (input.type === 'radio') {
                localStorage.setItem(input.name, input.id);
            } else if (input.type === 'number') {
                localStorage.setItem(input.placeholder, input.value);
            }
        });

        // Restore saved value from local storage on load
        const savedValue = localStorage.getItem(input.placeholder || input.name);
        if (savedValue) {
            if (input.type === 'radio' && input.id === savedValue) {
                input.checked = true;
            } else if (input.type === 'number') {
                input.value = savedValue;
            }
        }
    });
});
function sendDataToBackend() {
    // Create a JSON object from localStorage data
    const data = {
        gender: localStorage.getItem('Gender'),
        goal: localStorage.getItem('Goals'),
        weight: localStorage.getItem('Input Weight'),
        height: localStorage.getItem('Input Height')
    };

    // Send the data to the backend using Fetch API
    fetch('/save_settings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
}

// Call this function whenever you want to send data to Python backend
sendDataToBackend();

