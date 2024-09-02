from ..database import bodyfat_collection
from ..models.bodyfatModels import Item, newItem
from fastapi import HTTPException

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