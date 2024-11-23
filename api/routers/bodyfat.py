from fastapi import APIRouter, Depends, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, HTTPBasic
from api.helper.crud import get_items, get_new_items, get_bodyfat_category, get_womens_bodyfat, get_lifestyle_items
from ..database import db, bodyfat_collection
from ..models.bodyfatModels import BodyFatInput
from typing import List
import pandas as pd
import numpy as np
import logging
from typing import Annotated
from .auth import get_current_user, protected_route, verify_token


router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

items = get_items()

newItems = get_new_items()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.get('/api/df')
def return_df(current_users: Annotated[str, Depends(oauth2_scheme)]):
    # Convert the list of Item objects to a Dataframe
    df = pd.DataFrame([item.dict() for item in items])

    # Remove brackets and quotes
    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

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

    element = []
    # Convert the list of Item objects to a Dataframe
    df = pd.DataFrame([item.dict() for item in items])

    # Remove brackets and quotes
    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    dfAgeAverage = round(np.average(df['Age'].values), 2)
    dfAbdomenAverage = round(np.average(df['Abdomen'].values), 2)
    dfBicepsAverage = round(np.average(df['Biceps'].values), 2)
    dfWristAverage = round(np.average(df['Wrist'].values), 2)
    dfThighAverage = round(np.average(df['Thigh'].values), 2)
    dfNeckAverage = round(np.average(df['Neck'].values), 2)
    dfKneeAverage = round(np.average(df['Knee'].values), 2)
    dfHeightAverage = round(np.average(df['Height'].values), 2)
    dfHipAverage = round(np.average(df['Hip'].values), 2)
    dfForearmAverage = round(np.average(df['Forearm'].values), 2)
    dfDensityAverage = round(np.average(df['Density'].values), 2)
    dfChestAverage = round(np.average(df['Chest'].values), 2)
    dfBodyFatAverage = round(np.average(df['BodyFat'].values), 2)
    dfWeightAverage = round(np.average(df['Weight'].values), 2)

    return { "avgAge": dfAgeAverage, "avgAbdomen": dfAbdomenAverage, "avgBiceps": dfBicepsAverage, "avgWrist": dfWristAverage, 
            "avgThigh": dfThighAverage, "avgNeck": dfNeckAverage, "avgKnee": dfKneeAverage, "avgHeight": dfHeightAverage, "avgHip": dfHipAverage, "avgForearm": dfForearmAverage,
            "avgDensity": dfDensityAverage, "avgChest": dfChestAverage, "avgBodyFat": dfBodyFatAverage, "avgWeight": dfWeightAverage
            }

@router.get('/api/convert')
async def convert_percents():

    df = pd.DataFrame([item.dict() for item in items])

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    df['Bodyfat Weight'] = round(df['BodyFat'].astype(float) / 100 * df['Weight'].values, 2)

    return df.to_dict(orient='records')

@router.get('/api/bodyfat-status-men')
async def bodyfat_status_men():
    
    df = pd.DataFrame([item.dict() for item in items])

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    def categorize(row):
        bodyfat = row['BodyFat']
        return get_bodyfat_category(bodyfat)
    
    df['Men BodyFatCategory'] = df.apply(categorize, axis=1)

    print("df", df)

    return df.to_dict(orient='records')

@router.get('/api/bodyfat-status-women')
async def bodyfat_status_women():
    
    df = pd.DataFrame([item.dict() for item in items])

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '') if isinstance(x, str) else x)

    def categorize(row):
        bodyfat = row['BodyFat']
        return get_womens_bodyfat(bodyfat)
    
    df['Women BodyFatCategory'] = df.apply(categorize, axis=1)

    return df.to_dict(orient='records')


@router.post('/api/calculate-bodyfat')
def calculate_bodyfat(bodyfat_input: BodyFatInput):
    weight = bodyfat_input.weight
    height = bodyfat_input.height
    bodyfat_percentage = bodyfat_input.bodyfat_percentage

    # Figure out the formula to calculate bodyfat loss
    return { "weight": weight, "height": height, "bodyfat_percentage": bodyfat_percentage}
