from fastapi import APIRouter
from pymongo import MongoClient
from urllib import parse
from fastapi.encoders import jsonable_encoder
from os import getenv
from pydantic import BaseModel
from enum import Enum

db_router = APIRouter(prefix="/db", tags=["Database"])

class FeedbackEnum(str, Enum):
    correct='correct'
    incorrect='incorrect'

class AccuracyFeedback(BaseModel):
    feedback: FeedbackEnum

class NewAccuracyData(BaseModel):
    msg: str
    correct: int
    incorrect: int

@db_router.get("/accuracy")
def get_accuracy():
    acc_coll = get_collection("nn-app", "accuracy")
    accuracy = acc_coll.find_one({})

    return {"correct": accuracy["correct"], "incorrect": accuracy["incorrect"]}

@db_router.post("/results", response_model=NewAccuracyData)
def post(request: AccuracyFeedback):
    post_content = jsonable_encoder(request)
    acc_coll = get_collection("nn-app", "accuracy")

    if post_content["feedback"] == "correct":
        acc_coll.update_one({}, {"$inc": {"correct": 1}})
    else:
        acc_coll.update_one({}, {"$inc": {"incorrect": 1}})

    accuracy = acc_coll.find_one({})

    return {
        "msg": "updated accuracies",
        "correct": accuracy["correct"],
        "incorrect": accuracy["incorrect"],
    }

def get_client():
    print("\n getting info \n")
    return MongoClient(
        f"mongodb://{getenv('USER_NAME')}:{parse.quote_plus(getenv('PASSWD'))}@{getenv('MONGO_HOST')}:{getenv('MONGO_PORT')}/admin"
    )

def get_collection(database, collection):
    client = get_client()
    db = client[database]
    col = db[collection]
    return col