import json
def calculateMacros(data):
    settings = json.loads(data)
    gender=settings["Gender"]
    goal=settings["Goal"]
    weight=settings["Weight"]
    height=settings["Height"]
    activityLevel=settings["ActivityLevel"]
    print(settings)
    pass
