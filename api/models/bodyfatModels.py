from pydantic import BaseModel
from typing import Literal

class Item(BaseModel):
    id: str
    Density: float | int
    BodyFat: float | int
    Age: int
    Weight: float | int
    Height: float
    Neck: float | int
    Chest: float | int
    Abdomen: float | int
    Hip: float | int
    Thigh: float | int
    Knee: float | int
    Ankle: float | int
    Biceps: float | int
    Forearm: float | int
    Wrist: float | int

class newItem(BaseModel):
    id: str
    Density: float | int
    BodyFat: float | int
    Age: int
    Weight: float | int
    Height: float
    Neck: float | int
    Chest: float | int
    Abdomen: float | int
    Hip: float | int
    Thigh: float | int
    Knee: float | int
    Ankle: float | int
    Biceps: float | int
    Forearm: float | int
    Wrist: float | int
    Bodyfat_Weight: float | int

class LifestyleItem(BaseModel):
    id: str
    Person_ID: int
    Gender: str
    Age: int
    Occupation: str
    Sleep_Duration: float | int
    Quality_Of_Sleep: int | float
    Physical_Activity_Level: int | float
    Stress_Level: int | float
    BMI_Category: str
    Blood_Pressure: str
    Heart_Rate: int | float
    Daily_Steps: int | float
    # Sleep_Disorder: Literal["Sleep Apnea", "Insomnia"]

