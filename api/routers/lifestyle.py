from fastapi import APIRouter
from ..database import lifestyle_collection
from api.helper.crud import get_lifestyle_items
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
import pandas as pd
import numpy as np
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

items = get_lifestyle_items()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get('/api/lifestyle')
def return_lifestyle_df(current_users: Annotated[str, Depends(oauth2_scheme)]):

    df = pd.DataFrame([item.dict() for item in items])

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    df = df.head(250)

    return df.to_dict(orient='records')

