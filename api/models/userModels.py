from pydantic import BaseModel
from typing import Literal
from sqlalchemy import Column, String

class UserCreate(BaseModel):
    username: str
    email: str
    password: str