FROM mongo

# mongo env configs 
ENV MONGO_INITDB_DATABASE nn-app
ENV MONGO_INITDB_ROOT_USERNAME admin-user
ENV MONGO_INITDB_ROOT_PASSWORD admin-password

# copy data to auto populate database on instantiation
COPY seed-data.js /docker-entrypoint-initdb.d/