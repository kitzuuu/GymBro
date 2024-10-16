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
var socket = io.connect(); // Initialize the socket connection

// Function to send a message to the server
function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        document.getElementById('chat-box').innerHTML += '<p><strong>You:</strong> ' + userInput + '</p>';
        socket.emit('message', userInput); // Emit the message to the server
        document.getElementById('user-input').value = ''; // Clear the input field
    }
}

// Event listener for send button
document.getElementById('send-message').addEventListener('click', sendMessage);

// Event listener for receiving chatbot response
socket.on('response', function(data) {
    document.getElementById('chat-box').innerHTML += '<p><strong>Bot:</strong> ' + data + '</p>';
    // Scroll to the bottom of the chat box
    var chatBox = document.getElementById('chat-box');
    chatBox.scrollTop = chatBox.scrollHeight;
});

// Allow sending messages via Enter key
document.getElementById('user-input').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
});