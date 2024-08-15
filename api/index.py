from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import bodyfat
from mangum import Mangum


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

handler = Mangum(app)

# FIGURE OUT WHY ARRAY OF STRINGS IN COLUMNS MATCHES NUMBER DATA IN TABLE COMPONENT
# CENTER DATA TABLE
# MAKE SURE VERCEL DEPLOYMENT WORKS AS INTENDED
    # MAYBE NOT WORKING BECAUSE I NEED TO PUT BACKEND IN VERCEL DEPLOYMENT
# TURN OFF FILTERS FOR COLUMN
# THEN FIND CREATIVE WAYS TO DISPLAY THE DATA WHILE ALSO MANIPULATING

