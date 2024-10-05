from typing import List
from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBasicCredentials, HTTPBasic
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel
from ..data.users import users_db
from ..auth.authentication import create_access_token, get_current_user
from ..models.userModels import UserCreate
from ..database import users_collection

router = APIRouter()

security = HTTPBasic()

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["username"],
        "email": user["email"],
        "password": user["password"]
    }


@router.post("/register")
async def create_user(user: UserCreate):
    # user.created_at = user.created_at or datetime.now()
    existing_user = users_collection.find_one({"$or": [{"email": user.email}, {"username": user.username}]})

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )
    
    new_user = users_collection.insert_one(user.model_dump())
    created_user = users_collection.find_one({"_id": new_user.inserted_id})
    return user_helper(created_user)

@router.get("/users")
def get_users():
    users = []
    for user in users_collection.find():
        users.append(user_helper(user))
    return users



@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if user is None or user.password != form_data.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected")
async def protected_route(username: str = Depends(get_current_user)):
    return {"message": f"Hello, {username}! This is a protected resource."}


# SIMPLE BASIC AUTH
# @router.get("/protected")
# def read_current_user(credentials: Annotated[HTTPBasicCredentials, Depends(security)]):
#     return {"username": credentials.username, "password": credentials.password}