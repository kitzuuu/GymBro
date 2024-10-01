import flask as fl

app = fl.Flask(__name__)

# Route for the home page
@app.route('/')
def home():
    return fl.render_template('index.html')

# Route for the settings page
@app.route('/settings')
def settings():
    return fl.render_template('settings.html')

# Route for the planner page
@app.route('/planner')
def planner():
    return fl.render_template('planner.html')

# Route to save settings via POST request
@app.route('/save-settings', methods=['POST'])
def save_settings():
    data = fl.request.json  # Get JSON data sent from frontend
    print("Data received:", data)

    # Process the data (save it to a database, file, etc.)

    return fl.jsonify({"status": "success", "data_received": data})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
