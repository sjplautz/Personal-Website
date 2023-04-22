from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from utils.nn_api.image_module import ClassificationPrediction, handle_img_post


db_router = APIRouter(prefix="/nn-api", tags=["Neural Network"])

class ClassificationRequest(BaseModel):
    url: str

@db_router.post("/classify-image", response_model=ClassificationPrediction)
def post(request: ClassificationRequest):
    post_content: ClassificationRequest = jsonable_encoder(request)
    return handle_img_post(post_content=post_content)
