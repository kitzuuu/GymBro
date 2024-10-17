from flask import Flask, render_template, request, jsonify
import logging
from PyInstaller.utils.hooks import copy_metadata

# Include metadata for requests package
datas = copy_metadata('requests')


logging.basicConfig(filename='app.log', level=logging.DEBUG)


from api.ApiCaller import call_api

app = Flask(__name__)


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

if __name__ == '__main__':
    app.run( port=5001, debug=True)


