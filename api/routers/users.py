from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from ..database import users_collection
from bson import ObjectId
from ..database import users_collection
from ..models.userModels import UserCreate
from passlib.context import CryptContext
from datetime import datetime
from .auth import get_current_user, protected_route, verify_token
from typing import Annotated


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["username"],
        "email": user["email"],
        "password": user["password"],
        "hashed_password": user["hashed_password"],
        "created_at": user.get("created_at", datetime.now())
    }

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def validate_object_id(user_id: str):
    if not ObjectId.is_valid(user_id):
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    return ObjectId(user_id)


@router.get("/api/get-users")
def get_users(current_users: Annotated[str, Depends(oauth2_scheme)]):
    print("current users", current_users)
    users = []
    for user in users_collection.find():
        users.append(user_helper(user))
    return users


@router.delete("/api/users/{user_id}")
async def delete_user(user_id: str, validated_id: ObjectId = Depends(validate_object_id)):
    result = users_collection.delete_one({"_id": validated_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return { "status": "User deleted successfully" }


@router.post("/api/register")
async def create_user(user: UserCreate):
    existing_user = users_collection.find_one({"$or": [{"email": user.email}, {"username": user.username}]})

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already exists"
        )
    
    hashed_password = hash_password(user.password)

    user_data = user.model_dump()
    user_data["hashed_password"] = hashed_password

    new_user = users_collection.insert_one(user_data)
    created_user = users_collection.find_one({"_id": new_user.inserted_id})
    return user_helper(created_user)


@router.get("/api/datasets")
async def allow_datasets(current_users: Annotated[str, Depends(oauth2_scheme)]):
    return current_users
