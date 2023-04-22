// authentication necessary for db creation
db.auth('admin-user', 'admin-password')
db = db.getSiblingDB('nn-app')

// initial data for accuracy collection
db.accuracy.insertOne({
    "correct": 94,
    "incorrect": 2
})