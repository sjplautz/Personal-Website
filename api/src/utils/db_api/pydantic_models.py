from pydantic import BaseModel
from enum import Enum

class FeedbackEnum(str, Enum):
    correct='correct'
    incorrect='incorrect'

class AccuracyFeedback(BaseModel):
    feedback: FeedbackEnum

class NewAccuracyData(BaseModel):
    msg: str
    correct: int
    incorrect: int