from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status, APIRouter, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBasic
from passlib.context import CryptContext
from ..models.userModels import UserCreate, UserInDB, token, TokenCreate, TokenData
from ..database import users_collection, blacklisted_tokens, get_users_collection
from jose.exceptions import JWTError
import jwt
from typing import Annotated

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

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY_REFRESH, algorithm=ALGORITHM)
    return encoded_jwt

def fake_decode_token(token):
    return UserCreate(
        username=token + "fakedecoded", email="john@example.com", password="John Doe"
    )


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
# I'm able to get token string but it shows the key "expired token" key with it. Try using it with "Depends" protected route now
    user = fake_decode_token(token)
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
async def protected_route(user: dict = Depends(get_current_user)):
    return {"message": "This is a protected resource", "user": user}


@router.post("/api/logout")
def logout(token: token):
    expired_token = token.model_dump()
    new_expired_token = blacklisted_tokens.insert_one(expired_token)
    created_expired_token = blacklisted_tokens.find_one({"_id": new_expired_token.inserted_id})
    get_current_user(token)
    return token_helper(created_expired_token)
