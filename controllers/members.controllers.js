const { ObjectId, ObjectID } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

let members = [
  { id: 1, name: "rashidul", age: 23 },
  { id: 2, name: "samrat", age: 25 },
  { id: 3, name: "mominur", age: 26 },
];

// app.get method
module.exports.getAllMembers = async (req, res, next) => {
  //console.log("Request in: ", req);

  //   res.send("find all member");
  // any download file
  //   res.download(__dirname + "/members.controllers.js");

  //   res.send("got it");
  //   res.json({ name: "rashidul" });

  // const { limit, page } = req.query;
  // console.log(limit, page);
  // res.json(members.slice(0, limit));

  try {
    const db = getDb();
    const { limit, page } = req.query;
    const query = {};
    const allMembers = await db.collection("addMembers").find(query).toArray();
    // const members = await db.collection("addMembers").find(query).skip(3).limit(1).toArray();
    // console.log(allMembers.length);
    if (!Number(page * limit)) {
      res.status(200).send({
        success: true,
        message: `Successfully Get All Members`,
        data: allMembers,
      });
    } else if (Number(page * limit) < allMembers.length) {
      const limitOfMembers = await db
        .collection("addMembers")
        .find(query)
        .skip(Number(page * limit)) // pagination system
        .limit(Number(limit))
        .toArray();
      // console.log(limitOfMembers);

      res.status(200).send({
        success: true,
        message: `Successfully Get All Members`,
        data: limitOfMembers,
      });
    } else {
      res.status(400).send({
        success: false,
        error: `Your query is out of limits, please try again`,
      });
    }

    // res.status(200).send({
    //   success: true,
    //   message: `Successfully Get All Members`,
    //   data: allMembers,
    // });
  } catch (error) {
    next(error);
  }
};

// module.exports = {

//     getAllMembers,
// }

// app.post method
module.exports.postAllMembers = async (req, res, next) => {
  try {
    const db = getDb();
    const member = req.body;
    const result = await db.collection("addMembers").insertOne(member);
    if (!result.insertedId) {
      return res.status(400).send({
        status: false,
        error: "Something went wrong!!!",
      });
    }
    // res.send(`Member added with id: ${result.insertedId}`);
    res.status(200).send({
      success: true,
      member: `Member added with id: ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }

  // const bodyData = req.body;
  // console.log(bodyData);
  // members.push(bodyData);
  // res.send(members);
};

// check valid id or not use function
const validId = (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      success: false,
      error: "Not a valid member id.",
    });
  }
  return id;
};

// app.get method use ("/:id")
module.exports.getMemberDetails = async (req, res, next) => {
  // const { id } = req.params;
  // // console.log("get members id: ", id);
  // //   const foundMember = members.find((found) => found.id == id);
  // const foundMember = members.find((found) => found.id === Number(id));
  // console.log(foundMember);
  // //   res.send("get data");
  // if (!foundMember) {
  //   res.send("sorry!! data is not found.");
  // } else {
  //   res.send(foundMember);
  // }
  try {
    const db = getDb();

    // const { id } = req.params;
    // if (!ObjectId.isValid(id)) {
    //   return res.status(400).send({
    //     success: false,
    //     error: "Not a valid member id.",
    //   });
    // }

    // use a function
    const id = validId(req, res);

    const query = { _id: ObjectId(id) };
    const member = await db.collection("addMembers").findOne(query);

    if (!member) {
      return res.status(400).send({
        success: false,
        error: "Couldn't find a member with this id.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Successfully data found!",
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

// app.patch method use ("/:id")
module.exports.updateMember = async (req, res, next) => {
  // const { id } = req.params;
  // const { name } = req.body;
  // // console.log(id);
  // const newData = members.find((member) => member.id === Number(id));
  // newData.id = id;
  // newData.name = name;
  // // console.log(newData);
  // res.send(newData);

  try {
    const db = getDb();

    // const { id } = req.params;
    // if (!ObjectId.isValid(id)) {
    //   return res.status(400).send({
    //     success: false,
    //     error: "Not a valid member id.",
    //   });
    // }
    // use a function
    const id = validId(req, res);
    const query = { _id: ObjectId(id) };
    const update = {
      $set: req.body,
    };

    const updateMember = await db
      .collection("addMembers")
      .updateOne(query, update);

    if (!updateMember.modifiedCount) {
      return res.status(400).send({
        success: false,
        error: "Couldn't update the tool",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully updated member",
      data: updateMember,
    });
  } catch (error) {
    next(error);
  }
};

// app.put method use ("/:id")
module.exports.updateMemberPut = async (req, res, next) => {
  const { id } = req.params;
  const testData = members.find((member) => member.id === Number(id));

  testData.name = req.body.country;
  res.send(testData);
};

// app.delete method use ("/:id")
module.exports.deleteMemberData = async (req, res, next) => {
  // const { id } = req.params;
  // const filter = { _id: id };
  // members = members.filter((member) => member.id != Number(id));

  // // res success structure
  // res.status(200).send({
  //   success: true,
  //   message: "success",
  //   data: members,
  // });

  // res success structure
  // res.status(500 / 401 / 403 / etc).send({
  //   success: false,
  //   error: "here error message",
  // });

  try {
    const db = getDb();

    // const { id } = req.params;
    // if (!ObjectId.isValid(id)) {
    //   return res.status(400).send({
    //     success: false,
    //     error: "Not a valid member id.",
    //   });
    // }
    // use a function
    const id = validId(req, res);
    const query = { _id: ObjectId(id) };
    const deleteMember = await db.collection("addMembers").deleteOne(query);

    if (!deleteMember.deletedCount) {
      return res.status(400).send({
        success: false,
        error: "Couldn't delete the tool",
      });
    }

    res.status(200).send({
      success: true,
      message: "Successfully deleted member",
      data: deleteMember,
    });
  } catch (error) {
    next(error);
  }
};
