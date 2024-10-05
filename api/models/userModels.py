from pydantic import BaseModel, EmailStr, Field
from typing import Literal, Optional
from bson import ObjectId
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(..., min_length=6)

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "age": 30,
                "email": "john@example.com",
            }
        }