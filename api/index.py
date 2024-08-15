from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo import MongoClient
from pydantic import BaseModel
import os
from .routers import bodyfat

app = FastAPI()

# Allow CORS from the specified origins
origins = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    "trackfat.vercel.app",
    "https://trackfat-git-main-acim650gmailcoms-projects.vercel.app",
    "https://trackfat-r57b7kl3v-acim650gmailcoms-projects.vercel.app"
    # Add other origins as necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(bodyfat.router)

# FIGURE OUT WHY ARRAY OF STRINGS IN COLUMNS MATCHES NUMBER DATA IN TABLE COMPONENT
# CENTER DATA TABLE
# MAKE SURE VERCEL DEPLOYMENT WORKS AS INTENDED
# TURN OFF FILTERS FOR COLUMN
# THEN FIND CREATIVE WAYS TO DISPLAY THE DATA WHILE ALSO MANIPULATING

