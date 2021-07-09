import requests
import logging
import sys
import json
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

        response = msg.json()
        response.update({"topic" : 'neural-network-app'})
        return response, 200
    
    def post(self):
        if(self.debug):
            msg = requests.post("http://0.0.0.0:8080/api", json=request.get_json())
        else:
            msg = requests.post("http://neuralnetwork-svc.default.svc.cluster.local/api", json=request.get_json())
            
        response = msg.json()
        response.update({"topic" : 'neural-network-app'})
        return response, 200

class Database(Resource):
    def __init__(self, api, *args, **kwargs):
        super().__init__(api=api, *args, **kwargs)
        self.debug = DEBUG

    def get(self, resource):
        if(self.debug):
            msg = requests.get(("http://0.0.0.0:8080/" + resource))
        else:
            msg = requests.get(("http://database-svc.default.svc.cluster.local/" + resource))

        response = msg.json()
        response.update({"topic" : ('database/' + resource)})
        return response, 200
    
    def post(self, resource):
        if(self.debug):
            msg = requests.post(("http://0.0.0.0:8080/" + resource), json=request.get_json())
        else:
            msg = requests.post(("http://database-svc.default.svc.cluster.local/" + resource), json=request.get_json())

        response = msg.json()
        response.update({"topic" : ('database/' + resource)})
        return response, 200

api.add_resource(NeuralNetwork, '/neural-network-app')
api.add_resource(Database, '/database/<string:resource>')

if __name__ == '__main__':
    # remember to prepend API_BASE /backend to routes for debug mode requests
    if(DEBUG):
        app.run(host='0.0.0.0', port='9090', debug=True)
    else:
        app.run(host='0.0.0.0', port='80')