import flask as fl
from api.ApiCaller import call_api
from api.ProcessResponse import process_response

app = fl.Flask(__name__)

@app.route('/')
def mealPlanning():
    return fl.render_template('mealPlanning.html')
# Route for the settings page



@app.route('/workoutPlanner')
def workoutPlanner():
    return fl.render_template('workoutPlanner.html')

@app.route('/process_meal', methods=['POST'])
def process_meal():
    data = fl.request.json  # Get JSON data sent from frontend
    print("Data received:", data)

    # Assuming ApiCaller.call_api processes data and returns a response
    api_response = call_api(data)
    print(api_response)

    # Return the processed food_nutrition dictionary as a JSON response
    return fl.jsonify({"status": "success", "food_nutrition": api_response})


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)



