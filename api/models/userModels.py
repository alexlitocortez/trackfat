from pydantic import BaseModel
from typing import Literal
from sqlalchemy import Column, String

class UserCreate(BaseModel):
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)