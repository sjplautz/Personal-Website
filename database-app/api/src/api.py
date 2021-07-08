import logging
import urllib.parse
import sys
from flask import Flask, request
from flask_restx import Api, Resource
from flask_cors import CORS
from pymongo import MongoClient


# GLOBALS
DEBUG = (len(sys.argv) > 1)
if(DEBUG):
    MONGO_HOST = "test-db"
else:
    MONGO_HOST = "database-svc.default.svc.cluster.local"
USER_NAME = 'admin-user'
PASSWD = 'admin-password'
MONGO_PORT = 27017


# custom configurations
logging.basicConfig(filename='record.log', level=logging.DEBUG,
                    format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')


app = Flask(__name__)
CORS(app)
api = Api(app, version='1.0', title='database API',
          description='mongodb database api interface')


def get_client():
    return MongoClient(f'mongodb://{USER_NAME}:{urllib.parse.quote_plus(PASSWD)}@{MONGO_HOST}:{MONGO_PORT}/admin')

def get_collection(database, collection):
    client = get_client()
    db = client[database]
    col = db[collection]
    return col

class Accuracy(Resource):
    def __init__(self, api, *args, **kwargs):
        super().__init__(api=api, *args, **kwargs)
        self.debug = DEBUG

    def get(self):
        acc_coll = get_collection('nn-app', 'accuracy')
        accuracy = acc_coll.find_one({})

        return {
            "correct": accuracy['correct'],
            "incorrect": accuracy['incorrect']
        }

    def post(self):
        post_content = request.get_json()
        acc_coll = get_collection('nn-app', 'accuracy')

        if(post_content["feedback"] == "correct"):
            acc_coll.update_one({}, {"$inc": {"correct": 1}})
        else:
            acc_coll.update_one({}, {"$inc": {"incorrect": 1}})
        
        accuracy = acc_coll.find_one({})

        return {
            "msg": "updated accuracies",
            "correct": accuracy['correct'],
            "incorrect": accuracy['incorrect']
        }


api.add_resource(Accuracy, '/nn-app-accuracy')

if __name__ == '__main__':
    if(DEBUG):
        app.run(host='0.0.0.0', port='8080', debug=True)
    else:
        app.run(host="0.0.0.0", port='80')