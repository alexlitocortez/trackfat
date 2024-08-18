from fastapi import APIRouter
from api.helper.crud import get_items
from ..database import db, bodyfat_collection
import pandas as pd
import numpy as np
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

items = get_items()

@router.get('/api/df')
def return_df():

    # Convert the list of Item objects to a Dataframe
    df = pd.DataFrame([item.dict() for item in items])

    # Remove brackets and quotes
    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    print("df", df)

    return df.to_dict(orient='records')


@router.get('/api/test-db')
async def test_db():
    try:
        # perform simple query
        document_count = bodyfat_collection.count_documents({})
        return {"status": "Connected", "Document Count": document_count}
    except Exception as e:
        logging.error(f"Error accessing MongoDB: {e}")
        return {"status": "Failed", "error": str(e)}
    

@router.get('/api/avg-columns')
async def avg_columns():

    # Convert the list of Item objects to a Dataframe
    df = pd.DataFrame([item.dict() for item in items])

    # Remove brackets and quotes
    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    dfAge = df.to_numpy()

    dfAgeArray = df['Age'].values

    dfAgeAverage = np.average(df['Age'].values)

    return { "avg": dfAgeAverage }