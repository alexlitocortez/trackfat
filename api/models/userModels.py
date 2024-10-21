from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Optional
from bson import ObjectId
from datetime import date, datetime, time, timedelta
from passlib.context import CryptContext

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(..., min_length=6)
    # hashed_password: str

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "age": 30,
                "email": "john@example.com",
            }
        }

class token(BaseModel):
    expired_token: str
    refresh_token: str

class TokenCreate(BaseModel):
    access_token: str
    refresh_token: str
    status: bool
    created_date: datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserInDB(UserCreate):
    hashed_password: str





