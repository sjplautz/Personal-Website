from typing import Dict
import numpy as np
from PIL import Image
import io
import base64
import tensorflow as tf
from src.utils.nn_api.categorize_photo import categorize_image
from src.utils.nn_api.pydantic_models import ClassificationResults, ClassificationRequest

IMAGE_HEADER = "data:image/jpeg;base64,"
IMG_SIZE = 299



def handle_img_post(post_content: ClassificationRequest, ml_model_map: Dict[str, tf.keras.Model]) -> ClassificationResults:
    # get an image handle that cv2 can operate on
    img = b64_string_to_img(post_content.url)
    # transform the image for nn use
    img = transform_image(img)
    # predict the category of the photo usign the nn
    nn_model: tf.keras.Model = ml_model_map["flower_classification_model"]
    first_guess, second_guess = categorize_image(img, nn_model)
    # construct the response
    response = {
        'guess1' : {
            'category': first_guess[0],
            'confidence': str(first_guess[1]),
        },
        'guess2' : {
            'category': second_guess[0],
            'confidence': str(second_guess[1]),
        }
    }
    return response


def b64_string_to_img(url: str) -> Image.Image:
    # strips prefix image description
    encoded_data = url.split(',')[1]
    img = Image.open(io.BytesIO(base64.b64decode(encoded_data)))
    return img


def transform_image(img: Image.Image):
    image = img.resize((IMG_SIZE, IMG_SIZE))
    image = image.convert('RGB')
    image = np.asarray(image) / 255
    image = tf.expand_dims(image, 0)
    input_data = {'instances': np.asarray(image).astype(float)}
    
    return input_data