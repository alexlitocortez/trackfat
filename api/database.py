from pymongo import MongoClient
import os 
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv('MONGODB_URI')
client = MongoClient(uri)
db = client["bodyfat"]
bodyfat_collection = db["bodyfat"]

