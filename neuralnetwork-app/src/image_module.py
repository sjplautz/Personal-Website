import numpy as np
from PIL import Image
import io
import base64
import tensorflow as tf
import categorize_photo

IMAGE_HEADER = "data:image/jpeg;base64,"
IMG_SIZE = 299


def handlePost(post_content):
    # get an image handle that cv2 can operate on
    img = b64_string_to_img(post_content['url'])
    
    # transform the image for nn use
    img = transform_image(img)
    
    # predict the category of the photo usign the nn
    first_guess, second_guess = categorize_photo.categorize_image(img)

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


def b64_string_to_img(uri):
    # strips prefix image description
    encoded_data = uri.split(',')[1]

    img = Image.open(io.BytesIO(base64.b64decode(encoded_data)))

    return img


def transform_image(img):
    image = img.resize((IMG_SIZE, IMG_SIZE))
    image = image.convert('RGB')
    image = np.asarray(image) / 255
    image = tf.expand_dims(image, 0)
    input_data = {'instances': np.asarray(image).astype(float)}
    
    return input_data