const mongoose = require("mongoose");
const DbConfig = require("../config/config");

function getConnectionString() {
  return `mongodb+srv://${DbConfig.USERNAME}:${DbConfig.PASSWORD}@${DbConfig.CLUSTER_ADDRESS}/${DbConfig.DATABASE_NAME}?retryWrites=true&w=majority`;
}

function connectToDb() {
  return mongoose.connect(getConnectionString(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connect: connectToDb,
};
