import requests
from api.ProcessResponse import process_response

def call_api(data):
    url = 'https://trackapi.nutritionix.com/v2/natural/nutrients'
    headers = {
        'Content-Type': 'application/json',
        'x-app-id': '2238804f',
        'x-app-key': '046ecb26051f4865d89afcc3b3216909'
    }
    body = {
        'query': str(data['meal'])  # Ensure the meal query is correct
    }

    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Debugging: Print the raw response to inspect it

        # Process the JSON response only if it contains 'foods'
        response_json = response.json()

        if 'foods' not in response_json:
            print("Error: 'foods' key missing in the API response")
            return {"error": "API response missing 'foods' key"}

        # Process the response
        return process_response(response_json)

    except requests.exceptions.RequestException as e:
        print(f"API Request failed: {e}")
        return {"error": "API request failed"}

