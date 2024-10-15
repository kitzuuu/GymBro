import flask as fl
from flask_socketio import SocketIO, emit
import openai

app = fl.Flask(__name__)
socketio = SocketIO(app)

# Initialize OpenAI API
openai.api_key = 'your-openai-api-key'

@app.route('/')
def mealPlanning():
    return fl.render_template('mealPlanning.html')

@app.route('/workoutPlanner')
def workoutPlanner():
    return fl.render_template('workoutPlanner.html')

# Socket for real-time chatbot communication
@socketio.on('message')
def handle_message(message):
    print(f'Received message: {message}')
    response = generate_workout_recommendation(message)
    emit('response', response)

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

# Run the Flask app with SocketIO
if __name__ == '__main__':
    socketio.run(app, debug=True)
