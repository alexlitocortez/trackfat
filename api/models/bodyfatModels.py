from pydantic import BaseModel

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