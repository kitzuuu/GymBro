def process_response(response):
    # Print the response to inspect its structure

    # Initialize an empty dictionary to store the results
    food_nutrition = {}

    # Check if 'foods' exists in the response and it contains valid data
    if 'foods' not in response or not response['foods']:
        raise KeyError("The key 'foods' is missing or empty in the API response.")

    # Extract relevant information for each food item
    for food in response['foods']:
        food_name = food.get('food_name', 'Unknown').capitalize()  # Capitalize the first letter of the food name
        calories = food.get('nf_calories', 0)
        fat = food.get('nf_total_fat', 0)
        protein = food.get('nf_protein', 0)
        carbs = food.get('nf_total_carbohydrate', 0)

        # Store the extracted data in a dictionary
        food_nutrition[food_name] = {
            'calories': calories,
            'fat': fat,
            'protein': protein,
            'carbs': carbs
        }

    return food_nutrition
