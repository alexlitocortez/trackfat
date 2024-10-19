from pymongo import MongoClient
import pandas as pd
import os 
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
# from .models.userModels import UserCreate 
# import asyncio

load_dotenv()

uri = os.getenv('MONGODB_URI')
client = MongoClient(uri)
db = client["bodyfat"]
bodyfat_collection = db["bodyfat"]
lifestyle_collection = db["lifestyle"]
users_collection = db["users"]
blacklisted_tokens = db["blacklisted_tokens"]

df = pd.read_csv('/Users/alexcortez/Desktop/projects/nextjs-fastapi/api/csv/Sleep_health_and_lifestyle_dataset.csv')

data = df.to_dict(orient="records")

lifestyle_collection.insert_many(data)

