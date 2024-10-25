from typing import List
from datetime import datetime, timedelta, timezone
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBasicCredentials, HTTPBasic
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel
from ..data.users import users_db
from ..models.userModels import UserCreate, UserLogin, UserInDB, token, TokenCreate
from ..database import users_collection, blacklisted_tokens, get_users_collection
from jose.exceptions import JWTError
import jwt

router = APIRouter()

security = HTTPBasic()

SECRET_KEY = "75101dc6b276c6ed0940f54cdbada1373dfde4787c0dd95143f5cd56aec95285"
SECRET_KEY_REFRESH = "c4dfae0f0b534667677932d6fe071312ca47efed7efaf11d40038ef5bf9cfd4e"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 1440  


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY_REFRESH, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme), users=Depends(get_users_collection)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    
    if users is None:
        raise HTTPException(status_code=500, detail="Users collection not available")

    user = await users.find_one({"username": username})

    if user is None:
        raise credentials_exception
    
    return user


def authenticate_user(username: str, token: TokenCreate):
    user = users_collection.find_one({"username": username})
    if user is None:
        return False
    # if not verify_password(password, user["password"]):
    #     return False
    return user

def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["username"],
        "email": user["email"],
        "password": user["password"],
        "hashed_password": user["hashed_password"]
    }

def user_login(user) -> dict:
    return {
        "email": user["email"],
        "password": user["password"]
    }

def token_helper(token) -> dict:
    return {
        "expired_token": token["expired_token"]
    }

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

# Endpoint to create user
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

# Endpoint to retrieve users from MongoDB
@router.get("/api/get-users")
def get_users():
    users = []
    for user in users_collection.find():
        users.append(user_helper(user))
    return users


@router.post("/api/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = create_access_token(data={"sub": user["username"]}, expires_delta=access_token_expires)
    access_token = create_access_token(data={"sub": user["username"]})
    refresh_token = create_refresh_token(data={"sub": user["username"]})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


# Protects routes by making sure each request has a token
@router.get("/api/protected")
async def read_protected(user: dict = Depends(get_current_user)):
    # return "hello guyger"
    return {"message": "This is a protected resource", "user": user}


@router.post("/api/logout")
def logout(token: token):
    expired_token = token.model_dump()
    new_expired_token = blacklisted_tokens.insert_one(expired_token)
    created_expired_token = blacklisted_tokens.find_one({"_id": new_expired_token.inserted_id})
    return token_helper(created_expired_token)
