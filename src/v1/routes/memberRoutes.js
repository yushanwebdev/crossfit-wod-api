const express = require("express");
const router = express.Router();
const memberController = require("../../controllers/memberController");

router.get("/:memberId", memberController.getOneMember);

module.exports = router;
