from pymongo import MongoClient
import pandas as pd
import os 
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

uri = os.getenv('MONGODB_URI')
client = MongoClient(uri)
db = client["bodyfat"]
bodyfat_collection = db["bodyfat"]
lifestyle_collection = db["lifestyle"]

df = pd.read_csv('/Users/alexcortez/Desktop/projects/nextjs-fastapi/api/csv/Sleep_health_and_lifestyle_dataset.csv')

data = df.to_dict(orient="records")

lifestyle_collection.insert_many(data)

engine = create_engine(uri)

# Create declarative base meta instance
Base = declarative_base()

# Create session local class for session maker
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)