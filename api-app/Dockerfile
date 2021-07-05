FROM ubuntu

RUN apt-get update
RUN apt-get install -y python3 python3-pip
RUN pip3 install flask flask_restx flask-cors requests

COPY src/api.py /api.py

WORKDIR /

EXPOSE 8080

ENTRYPOINT [ "python3", "api.py" ]