import logging
import sys
from flask import Flask, request
from flask_restx import Api, Resource 
from flask_cors import CORS
import image_module

# GLOBALS
DEBUG = (len(sys.argv) > 1)

# custom configurations 
logging.basicConfig(filename='record.log', level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')

app = Flask(__name__)
CORS(app)
api = Api(app, version='1.0', title='web-portfolio API',
    description='a gateway api for connecting to my backend applications'
)

class Base(Resource):
    def __init__(self, api, *args, **kwargs):
        super().__init__(api=api, *args, **kwargs)
        self.debug = DEBUG

    def get(self):
        return {"msg": "successful get request"}
    
    def post(self):
        post_content = request.get_json()
        response = image_module.handlePost(post_content)
        return response

api.add_resource(Base, '/api')

if __name__ == '__main__':
    if(DEBUG):
        app.run(host='0.0.0.0', port='8080', debug=True)
    else:
        app.run(host="0.0.0.0", port='80')