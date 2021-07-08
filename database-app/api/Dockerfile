FROM mongo

RUN apt-get update && apt-get install -y --no-install-recommends python3 python3-pip
COPY requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

RUN mkdir app
COPY src/api.py app
WORKDIR /app

# flask port
EXPOSE 8080

#############################################
ENTRYPOINT ["python3", "api.py", "debug"]

# ENTRYPOINT ["python3", "api.py"] 