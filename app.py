import flask as fl


app = fl.Flask(__name__)

@app.route('/')
def mealPlanning():
    return fl.render_template('mealPlanning.html')
# Route for the settings page



@app.route('/workoutPlanner')
def workoutPlanner():
    return fl.render_template('workoutPlanner.html')




# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)



