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


# CALCULATIONS I WANT TO MAKE
    # Creating a column by multiplying bodyfat to weight for each row
        # Convert percentage to decimal
    # Create a column to see if a person is obese depending on their bodyfat percentage
        # How to see 
# FIGURE OUT WHY ARRAY OF STRINGS IN COLUMNS MATCHES NUMBER DATA IN TABLE COMPONENT
# FIGURE OUT WHEN TO USE DYNAMIC SQL QUERIES
# CREATE AUTH FOR BODYFAT APPLICATION

