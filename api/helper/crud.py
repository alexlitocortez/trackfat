from ..database import bodyfat_collection
from ..models.bodyfatModels import Item
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
    
