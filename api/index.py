from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from pydantic import BaseModel
import os
import pandas as pd

app = FastAPI()

# Allow CORS from the specified origins
origins = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    # Add other origins as necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

uri = os.getenv('MONGODB_URI')

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

item_list = []

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

# @app.get('/api/items', response_model=list[Item])
def test_connection():
    try:
        items = list(bodyfat_collection.find())

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

@app.get('/api/df')
def return_df():

    items = test_connection()

    # Convert the list of Item objects to a DataFrame
    df = pd.DataFrame([item.dict() for item in items])

    # Remove brackets and quotes if the columns contain lists as strings
    df = df.applymap(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    df.to_csv("test CSV", encoding='utf-8', index=True)

    return df.to_dict(orient='records')

# USE ENV VARIABLE
# FILE STRUCTURE FOR PYTHON FUNCTIONS
# GOAL IS TO EVENTUALLY SHOW A DATA TABLE SHOWING EXACTLY HOW THE CSV DISPLAYS
# THEN HAVE FILTERS FOR EACH COLUMN
# THEN FIND CREATIVE WAYS TO DISPLAY THE DATA WHILE ALSO MANIPULATING
