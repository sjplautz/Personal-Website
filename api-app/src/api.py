import requests
import logging
import sys
from flask import Flask, request
from flask_restx import Api, Resource 
from flask_cors import CORS

# GLOBALS
# necessary to route the resources properly, due to weird request phenomenon
API_ROOT = "/backend"
DEBUG = (len(sys.argv) > 1)

logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

app = Flask(__name__)
CORS(app)
api = Api(
    app, 
    version='1.0', 
    title='web-portfolio API',
    description='a gateway api for connecting to my backend applications',
    prefix=API_ROOT
)

# class is a view, does not hold state, need to hard-code params
class NeuralNetwork(Resource):
    def __init__(self, api, *args, **kwargs):
        super().__init__(api=api, *args, **kwargs)
        self.debug = DEBUG

    def get(self):
        if(self.debug):
            msg = requests.get("http://0.0.0.0:8080/api")
        else:
            msg = requests.get("http://neuralnetwork-svc.default.svc.cluster.local/api")

        return msg.json(), 200
    
    def post(self):
        if(self.debug):
            msg = requests.post("http://0.0.0.0:8080/api", json=request.get_json())
        else:
            msg = requests.post("http://neuralnetwork-svc.default.svc.cluster.local/api", json=request.get_json())
            
        return msg.json(), 200

api.add_resource(NeuralNetwork, '/neural-network-app')

if __name__ == '__main__':
    if(DEBUG):
        app.run(host='0.0.0.0', port='6969', debug=True)
    else:
        app.run(host='0.0.0.0', port='80')