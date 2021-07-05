FROM ubuntu

RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip
RUN pip3 install tensorflow 
RUN pip3 install flask flask_restx flask-cors requests
RUN python3 -m pip install --upgrade Pillow

# copy all items from src folder to app root
COPY src /app

WORKDIR /

EXPOSE 8080

ENTRYPOINT [ "python3", "app/api.py" ]