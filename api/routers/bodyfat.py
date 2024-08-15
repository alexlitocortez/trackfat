from fastapi import APIRouter
from api.helper.crud import get_items
import pandas as pd

router = APIRouter()

@router.get('/api/df')
def return_df():

    items = get_items()

    # Convert the list of Item objects to a Dataframe
    df = pd.DataFrame([item.dict() for item in items])

    # Remove brackets and quotes
    df = df.map(lambda x: str(x).replace('[', '').replace(']', '').replace('"', '') if isinstance(x, str) else x)

    print("df", df)

    return df.to_dict(orient='records')