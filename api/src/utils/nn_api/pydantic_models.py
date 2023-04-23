from pydantic import BaseModel

class ClassificationRequest(BaseModel):
    url: str

class ClassificationPrediction(BaseModel):
    category: str
    confidence: str

class ClassificationResults(BaseModel):
    guess1: ClassificationPrediction
    guess2: ClassificationPrediction 