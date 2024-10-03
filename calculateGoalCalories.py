import json


def calculateTDEE(data):
    genderModifier = 0
    match (data["gender"]):
        case 'Man':
            genderModifier = 5
        case 'Woman':
            genderModifier = -161
    weight = int(data["weight"])
    height = int(data["height"])
    age = int(data["age"])
    adjustmentGoal = 0
    adjustmentActivity = 0
    match(data['goal']):
        case 'GainWeight':
            adjustmentGoal = 500
        case 'LoseWeight':
            adjustmentGoal = -500
    match(data['activity']):
        case 'veryActive' : adjustmentActivity = 1.725
        case 'active' : adjustmentActivity = 1.55
        case 'lightActive' : adjustmentActivity = 1.375
        case 'bmr' : adjustmentActivity = 1.0
    print( weight, height, age, genderModifier, adjustmentGoal, adjustmentActivity)
    TDEE = ((10 * weight + 6.25 * height - 5 * age + genderModifier) * adjustmentActivity) + adjustmentGoal
    print(TDEE)
