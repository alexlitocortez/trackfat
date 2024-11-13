from ..database import bodyfat_collection, lifestyle_collection
from ..models.bodyfatModels import Item, newItem, LifestyleItem
from fastapi import HTTPException

def get_lifestyle_items():
    try:
        lifestyle_items = list(lifestyle_collection.find())
        lifestyle_items_list = []

        for lifestyle_item in lifestyle_items:

            lifestyle_item['_id'] = str(lifestyle_item['_id'])
            lifestyle_item['Gender'] = str(lifestyle_item.get('Gender', 'unknown'))
            lifestyle_item['Occupation'] = str(lifestyle_item.get('Occupation', 'unknown'))
            lifestyle_item['BMI_Category'] = str(lifestyle_item.get('BMI_Category', 'unknown'))
            lifestyle_item['Blood_Pressure'] = str(lifestyle_item.get('Blood_Pressure', 'unknown'))

            sleep_disorder = lifestyle_item['Sleep Disorder']
            if sleep_disorder not in ['Sleep Apnea', 'Insomnia']:
                sleep_disorder = None

            lifestyle_item_data = LifestyleItem(
                id=lifestyle_item['_id'],
                Person_ID=lifestyle_item['Person ID'],
                Gender=lifestyle_item['Gender'],
                Age=lifestyle_item['Age'],
                Occupation=lifestyle_item['Occupation'],
                Sleep_Duration=lifestyle_item['Sleep Duration'],
                Quality_Of_Sleep=lifestyle_item['Quality of Sleep'],
                Physical_Activity_Level=lifestyle_item['Physical Activity Level'],
                Stress_Level=lifestyle_item['Stress Level'],
                BMI_Category=lifestyle_item['BMI Category'],
                Blood_Pressure=lifestyle_item['Blood Pressure'],
                Heart_Rate=lifestyle_item['Heart Rate'],
                Daily_Steps=lifestyle_item['Daily Steps'],
                Sleep_Disorder=sleep_disorder
            )
            lifestyle_items_list.append(lifestyle_item_data)
        return lifestyle_items_list
    except Exception as e:
        return {"error": "An error occurred while fetching lifestyle items", "details": str(e)}
        # raise HTTPException(status_code=500, detail=str(e))
    

def get_items():
    try:
        items = list(bodyfat_collection.find())
        item_list = []

        for item in items:
            item['_id'] = str(item['_id'])  
            item_data = Item(
                id=item['_id'],
                Density=item['Density'],
                BodyFat=item['BodyFat'],
                Age=item['Age'],
                Weight=item['Weight'],
                Height=item['Height'],
                Neck=item['Neck'],
                Chest=item['Chest'],
                Abdomen=item['Abdomen'],
                Hip=item['Hip'],
                Thigh=item['Thigh'],
                Knee=item['Knee'],
                Ankle=item['Ankle'],
                Biceps=item['Biceps'],
                Forearm=item['Forearm'],
                Wrist=item['Wrist'],
            )
            item_list.append(item_data)
        return item_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_new_items():
    try:
        items = list(bodyfat_collection.find())
        item_list = []

        for item in items:
            item['_id'] = str(item['_id'])  
            item_data = newItem(
                id=item['_id'],
                Density=item['Density'],
                BodyFat=item['BodyFat'],
                Age=item['Age'],
                Weight=item['Weight'],
                Height=item['Height'],
                Neck=item['Neck'],
                Chest=item['Chest'],
                Abdomen=item['Abdomen'],
                Hip=item['Hip'],
                Thigh=item['Thigh'],
                Knee=item['Knee'],
                Ankle=item['Ankle'],
                Biceps=item['Biceps'],
                Forearm=item['Forearm'],
                Wrist=item['Wrist'],
                Bodyfat_Weight=item.get('Bodyfat_Weight', 0),
            )
            item_list.append(item_data)
        return item_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def get_bodyfat_category(bodyfat):
    
    ranges = [
        (0, 5, "Essential Fat"),
        (6, 13, "Athlete"),
        (14, 17, "Fit"),
        (18, 25, "Average"),
        (26, float('inf'), "Overweight")
    ]
    
    # Iterate through the ranges
    for lower, upper, category in ranges:
        if lower <= bodyfat <= upper:
            return category
    
    return "Unknown"  # If no range matches

def get_womens_bodyfat(bodyfat):

    ranges = [
        (0, 13, "Essential Fat"),
        (14, 20, "Athlete"),
        (21, 24, "Fitness"),
        (25, 31, "Average"),
        (26, float('inf'), "Overweight")
    ]

    for lower, upper, category in ranges:
        if lower <= bodyfat <= upper:
            return category
        
    return "Unknown"