from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pymongo.server_api import ServerApi
from pymongo import MongoClient
from pydantic import BaseModel, Field
import os
import asyncio

app = FastAPI()

load_dotenv()

uri = os.getenv('MONGODB_URI')
print(f"Using MongoDB URI: {uri}")  # Debug line to ensure the URI is correct


# Initialize MongoDB client
client = MongoClient('mongodb+srv://acim650:123@cluster0.ur0hj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client["bodyfat"]
bodyfat_collection = db["bodyfat"]

# Pydantic model for response
class Item(BaseModel):
    id: str
    Density: float | int
    BodyFat: float | int
    Age: int
    Weight: float | int
    Height: float
    Neck: float | int
    Chest: float | int
    Abdomen: float | int
    Hip: float | int
    Thigh: float | int
    Knee: float | int
    Ankle: float | int
    Biceps: float | int
    Forearm: float | int
    Wrist: float | int

    # class Config:
    #     # Allow the aliasing of `_id` to `id`
    #     json_encoders = {
    #         ObjectId: str
    #     }


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

# @app.get('/api/items', response_model=list[Item])
def test_connection():
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

@app.get('/api/data', response_model=list[Item])
def return_data():
    return test_connection()

# CONVERT ARRAY OF OBJECTS INTO DATAFRAME
