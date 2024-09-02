from fastapi import APIRouter, HTTPException
from api.helper.crud import get_items, get_new_items, get_bodyfat_category, get_womens_bodyfat
from ..database import db, bodyfat_collection
from typing import List
import pandas as pd
import numpy as np
import logging


router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

items = get_items()

newItems = get_new_items()

@router.get('/api/df')
def return_df():

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

    dfAgeAverage = np.average(df['Age'].values)
    dfAbdomenAverage = np.average(df['Abdomen'].values)
    dfBicepsAverage = np.average(df['Biceps'].values)
    dfWristAverage = np.average(df['Wrist'].values)
    dfThighAverage = np.average(df['Thigh'].values)
    dfNeckAverage = np.average(df['Neck'].values)
    dfKneeAverage = np.average(df['Knee'].values)
    dfHeightAverage = np.average(df['Height'].values)
    dfHipAverage = np.average(df['Hip'].values)
    dfForearmAverage = np.average(df['Forearm'].values)
    dfDensityAverage = np.average(df['Density'].values)
    dfChestAverage = np.average(df['Chest'].values)
    dfBodyFatAverage = np.average(df['BodyFat'].values)
    dfWeightAverage = np.average(df['Weight'].values)

    return { "avgAge": dfAgeAverage, "avgAbdomen": dfAbdomenAverage, "avgBiceps": dfBicepsAverage, "avgWrist": dfWristAverage, 
            "avgThigh": dfThighAverage, "avgNeck": dfNeckAverage, "avgKnee": dfKneeAverage, "avgHeight": dfHeightAverage, "avgHip": dfHipAverage, "avgForearm": dfForearmAverage,
            "avgDensity": dfDensityAverage, "avgChest": dfChestAverage, "avgBodyFat": dfBodyFatAverage, "avgWeight": dfWeightAverage
            }

@router.get('/api/convert')
async def convert_percents():

    df = pd.DataFrame([item.dict() for item in items])

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    df['Bodyfat Weight'] = df['BodyFat'].astype(float) / 100 * df['Weight'].values

    return df.to_dict(orient='records')


@router.get('/api/bodyfat-status-men')
async def bodyfat_status_men():
    
    df = pd.DataFrame([item.dict() for item in items])

    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    def categorize(row):
        bodyfat = row['BodyFat']
        return get_bodyfat_category(bodyfat)
    
    df['BodyFatCategory'] = df.apply(categorize, axis=1)

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