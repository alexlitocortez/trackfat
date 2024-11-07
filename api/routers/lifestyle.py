from fastapi import APIRouter
from ..database import lifestyle_collection
from api.helper.crud import get_lifestyle_items
import pandas as pd
import numpy as np
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

items = get_lifestyle_items()

@router.get('/api/lifestyle')
async def return_lifestyle_df():

    df = pd.DataFrame([item.dict() for item in items])

    print("items", items)

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    return df.to_dict(orient='records')

