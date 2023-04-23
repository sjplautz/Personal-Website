from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.encoders import jsonable_encoder
from src.utils.nn_api.image_module import handle_img_post
from src.utils.nn_api.pydantic_models import ClassificationPrediction, ClassificationRequest

nn_router = APIRouter(prefix="/nn-api", tags=["Neural Network"])

@nn_router.post("/classify-image", response_model=ClassificationPrediction)
def post(request: Request, post_data: ClassificationRequest):
    post_content: ClassificationRequest = jsonable_encoder(post_data)
    ml_model_map = request.app.state.ml_model_map
    return handle_img_post(post_content=post_content, ml_model_map=ml_model_map)
