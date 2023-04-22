FROM python:3.9

WORKDIR /usr/src
COPY ./requirements.txt .
RUN pip install --no-cache-dir --compile --gloabl-option=build_ext --upgrade -r ./requirements.txt

# Can be overridden by docker-compose environment variable
ENV PORT=8080
ENV HOST=0.0.0.0

CMD ["sh", "-c", "uvicorn app:app --reload --proxy-headers --host ${HOST} --port ${PORT}"]