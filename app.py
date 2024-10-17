from flask import Flask, render_template, request, jsonify
import openai
from flask_socketio import SocketIO, emit

from api.ApiCaller import call_api

app = Flask(__name__)
socketio = SocketIO(app, async_mode='threading') # Specify async_mode

# Initialize OpenAI API
openai.api_key = 'your-openai-api-key'

@app.route('/')
def mealPlanning():
    return render_template('mealPlanning.html')
# Route for the settings page



@app.route('/workoutPlanner')
def workoutPlanner():
    return render_template('workoutPlanner.html')

@app.route('/process_meal', methods=['POST'])
def process_meal():
    data = request.json  # Get JSON data sent from frontend
    api_response = call_api(data)
    return jsonify({"status": "success", "food_nutrition": api_response})


# Socket for real-time chatbot communication
@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    response = generate_workout_recommendation(message)
    emit('response', response)

    # Assuming ApiCaller.call_api processes data and returns a response

# Function to call OpenAI and generate the workout recommendation
def generate_workout_recommendation(user_input):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a fitness assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        workout_recommendation = response['choices'][0]['message']['content']
        return workout_recommendation
    except Exception as e:
        return f"An error occurred: {str(e)}"


# Run the Flask app
if __name__ == '__main__':
    app.run( port=5001, debug=True)





