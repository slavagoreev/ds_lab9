const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

// const url = "mongodb://localhost:27017/chat";
const url = "mongodb://lab9-mongo-mongodb-replicaset-0.lab9-mongo-mongodb-replicaset:27017,lab9-mongo-mongodb-replicaset-1.lab9-mongo-mongodb-replicaset:27017,lab9-mongo-mongodb-replicaset-2.lab9-mongo-mongodb-replicaset:27017/chat?replicaSet=rs0";

const connect = mongoose.connect(url, { useNewUrlParser: true });

module.exports = connect;
