const express = require("express");
// const {
//   getAllMembers,
//   saveAllMembers,
// } = require("../../controllers/members.controllers");

// membersControllers is a file name
const membersControllers = require("../../controllers/members.controllers");
const viewCount = require("../../middleware/veiwCount");
const router = express.Router();

// normal router design
// router.get("/", (req, res) => {
//   res.send("find all member");
// });

// router.post("/", (req, res) => {
//   res.send("add member");
// });

// short cat router design
router
  .route("/")
  /**
   * @api {get} /members all members
   * @apiDescription Get all the members
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number {1- }}     [page = 1]    list page
   * @apiParam {Number {1-100}}   [limit = 10]  users per page
   *
   * @apiSuccess {Object []}      all the tools
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden Only admin can access the data
   *
   */

  // .get((req, res) => {
  //   res.send("found a member");
  // })

  .get(membersControllers.getAllMembers)

  /**
   * @api {post} /members add members
   * @apiDescription Post all the members
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiParam {Number {1- }}     [page = 1]    list page
   * @apiParam {Number {1-100}}   [limit = 10]  users per page
   *
   * @apiSuccess {Object []}      all the tools
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden Only admin can access the data
   *
   */

  // .post((req, res) => {
  //   res.send("add member");
  // });

  .post(membersControllers.postAllMembers);

// other router and router middleware
// router.route("/:id").get(viewCount, membersControllers.getAllMembers)

router
  .route("/:id")
  .get(membersControllers.getMemberDetails)
  .patch(membersControllers.updateMember)
  .put(membersControllers.updateMemberPut)
  .delete(membersControllers.deleteMemberData);

module.exports = router;
