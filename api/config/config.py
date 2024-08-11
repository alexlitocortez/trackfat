# from motor.motor_asyncio import AsyncIOMotorClient, motor
from pymongo import MongoClient
from dotenv import load_dotenv
import os


load_dotenv()

client = MongoClient("MONGODB_URI")
db = client.get_database("bodyfat")
bodyfat_collection = db.get_collection("bodyfat")

all_data = bodyfat_collection.find()

# Print all data
for data in all_data:
    print("data", data)