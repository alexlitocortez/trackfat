from fastapi import APIRouter
from ..database import users_collection

router = APIRouter()

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["username"],
        "email": user["email"],
        "password": user["password"],
        "hashed_password": user["hashed_password"]
    }


# Endpoint to retrieve users from MongoDB
@router.get("/api/get-users")
def get_users():
    users = []
    for user in users_collection.find():
        users.append(user_helper(user))
    return users