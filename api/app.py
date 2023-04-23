from fastapi import FastAPI
from src.endpoints.db_api import db_router
from src.endpoints.nn_api import nn_router
from os import getenv
import uvicorn
from src.utils.nn_api.categorize_photo import load_model

app = FastAPI()
ml_model_map = {}
ml_model_map["flower_classification_model"] = load_model()
app.state.ml_model_map = ml_model_map

nn_router.ml_model_map
app.include_router(db_router)
app.include_router(nn_router)

if __name__ == "__main__":
    uvicorn.run("app:app", host=getenv('HOST'), port=getenv('PORT'), reload=False)