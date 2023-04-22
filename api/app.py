from fastapi import FastAPI
from src.endpoints.db_api import db_router
from os import getenv
import uvicorn
from contextlib import asynccontextmanager
from src.utils.nn_api.categorize_photo import load_model

ml_model_map = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    ml_model_map["flower_classification_model"] = load_model()
    yield
    # Clean up the ML models and release the resources
    ml_model_map.clear()

app = FastAPI(lifespan=lifespan)

app.include_router(db_router)

if __name__ == "__main__":
    uvicorn.run("app:app", host=getenv('HOST'), port=getenv('PORT'), reload=False)