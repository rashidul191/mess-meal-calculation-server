const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.eux3rme.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // collection DB
    const addMemberCollection = client
      .db("mess-meal-calculation")
      .collection("addMembers");

    console.log("connect mongo db");

    // app.post
    app.post("/addMemberDB", async (req, res) => {
      const query = req.body;
      const result = await addMemberCollection.insertOne(query);
      res.send(result);
    });

    // app.post
    app.get("/allMembers", async (req, res) => {
      const query = {};
      const result = await addMemberCollection.find(query).toArray();
      res.send(result);
    });

    // app.post
    app.delete("/member/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addMemberCollection.deleteOne(query);
      res.send(result);
    });


    // app.delete("/allChilds/:id", verifyJWT, verifyAdmin, async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: ObjectId(id) };
    //     const result = await childCollection.deleteOne(query);
    //     res.send(result);
    //   });

  } finally {
    //
  }
}
run().catch(console.dir);

// get response server
app.get("/", (req, res) => {
  res.send("mess meal calculation server running");
});

// listen port
app.listen(port, () => {
  console.log("listen port:", port);
});
