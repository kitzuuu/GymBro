import flask as fl

app = fl.Flask(__name__)
@app.route('/')
def home():
    return fl.render_template('index.html')
@app.route('/settings')
def settings():
    return fl.render_template('settings.html')
if __name__ == '__main__':
    app.run(debug=True)

@app.route('/save-settings', methods=['POST'])
def save_settings():
    data = fl.request.json  # Get JSON data sent from frontend
    print("Data received:", data)

    # Process the data (save it to a database, file, etc.)

    return fl.jsonify({"status": "success", "data_received": data})
