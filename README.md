# 🏋️ GymBro

A fitness and nutrition planner built for the *Intelligent User Interfaces* course at Maastricht University. Log meals in plain English, watch your daily macros add up and get a workout plan that fits your goal and schedule. It runs as a local Flask web app and is also packaged as a standalone desktop app.

## Features

- **Natural-language meal logging:** type something like "2 eggs and a slice of toast" and the Nutritionix API returns the calories, protein, carbs and fat of each item
- **Daily macro tracking:** logged meals are stored in the browser, summed into progress bars and reset each day; meals can also be added by hand
- **Workout planner:** recommends a plan based on your preferred intensity, goal and available time, and celebrates with confetti when you tick off every exercise 🎉
- **Desktop app:** packaged for macOS (`.app`) and Windows (`.exe`) with PyInstaller

## Tech stack

Python · Flask · JavaScript · Bootstrap · Nutritionix REST API · PyInstaller

## Run it locally

```bash
pip install flask requests pyinstaller
export NUTRITIONIX_APP_ID="your-app-id"
export NUTRITIONIX_APP_KEY="your-app-key"
python app.py
```

Then open http://localhost:5001. You can get free API credentials from [Nutritionix](https://developer.nutritionix.com/).

## Project structure

```
app.py                   Flask routes: pages and the /process_meal API
api/ApiCaller.py         Calls the Nutritionix natural-language nutrients endpoint
api/ProcessResponse.py   Extracts calories and macros for each food item
templates/               Meal planning and workout planner pages
static/js/               Meal logging, macro tracking and workout recommendation logic
Distribution/            Packaged desktop builds
```

## Team

Built by [Toma Cristian Nitu](https://github.com/kitzuuu) and [@DavidURM](https://github.com/DavidURM).
