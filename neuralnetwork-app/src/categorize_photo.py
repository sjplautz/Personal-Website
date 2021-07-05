import numpy as np
import tensorflow as tf
from classes import labels

from api import DEBUG
if(DEBUG):
    MODEL_PATH = "/home/stephen/Software/Git_Repos/Personal_Projects/Web_Portfolio/App_Data/neuralnetwork-app/src/"
else:
    MODEL_PATH = "/app/"
    
MODEL_NAME = "nn_model"

def categorize_image(image):
    model = load_model(MODEL_PATH, MODEL_NAME)
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

def load_model(modelPath, modelName):
    model = tf.keras.models.load_model(modelPath + modelName, compile=True)
    return model