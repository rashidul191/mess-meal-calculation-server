// function dbConnect() {
// //   const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.eux3rme.mongodb.net/?retryWrites=true&w=majority`;

// //   const client = new MongoClient(uri, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     serverApi: ServerApiVersion.v1,
// //   });
//     console.log("db connected")
// }
// module.exports = dbConnect;

const { MongoClient } = require("mongodb");
// local url = mongodb://localhost:27017
// const connectionString = process.env.ATLAS_URI;
const connectionString = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("mess-meal-calculation");
      console.log("Successfully connected to MongoDB.");
      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
