from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .routers import bodyfat
from mangum import Mangum
from models import userModels
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
import schemas
import models

Base.meta.create_all(engine)
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

app = FastAPI()

@app.post("/register")
def register_user(user: schemas.UserCreate, session: Session = Depends(get_session)):
    existing_user = session.query(models.userModels).filter_by(email=user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    encrypted_password = get_hashed_password(user.password)

    new_user = models.User(username=user.username, email=user.email, password=encrypted_password )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    return {"message":"user created successfully"}


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
    # Configure authentication (1)
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

