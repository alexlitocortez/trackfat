from pydantic import BaseModel
from typing import Literal

class UserCreate(BaseModel):
    email: str
    password: str