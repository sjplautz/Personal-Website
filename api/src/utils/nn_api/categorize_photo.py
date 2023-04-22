import numpy as np
import tensorflow as tf
from src.utils.nn_api.classes import labels

MODEL_PATH = "/usr/src/src/utils/nn_api/nn_model"

def load_model():
    model = tf.keras.models.load_model(MODEL_PATH, compile=True)
    return model

def categorize_image(image, model: tf.keras.Model):
    result = model.predict(image)
    d = {}
    scores = result[0]
    for idx, score in enumerate(scores):
        d[str(score)] = idx
    
    scores = np.sort(scores)
    score1st = scores[-1]
    score2nd = scores[-2]
    label1st = labels[d[str(score1st)]]
    label2nd = labels[d[str(score2nd)]]

    return (label1st, round(score1st, 3)), (label2nd, round(score2nd, 3))