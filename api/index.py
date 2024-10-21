from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, bodyfat
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
app.include_router(auth.router) 

handler = Mangum(app)


# CALCULATIONS I WANT TO MAKE
    # Configure authentication (1)
        # Create Refresh Token
        # Figure out what is URL searchParams
        # Create required 6 characters for password input in register page
        # Figure out why users need token for login
        # Figure out protected routes
    # Add calculator to determine how long to get to specific bf percentage (2)
    # Containerize either the frontend/backend/database (3)
    # Get sleep disorder field
    # Create nested routes
    # Add names to dataset
    # Understand bodyfat category function more
# CHECK WHY VERCEL ISN'T WORKING 
# FIGURE OUT WHY ARRAY OF STRINGS IN COLUMNS MATCHES NUMBER DATA IN TABLE COMPONENT
# FIGURE OUT WHEN TO USE DYNAMIC SQL QUERIES
# CREATE AUTH FOR BODYFAT APPLICATION

