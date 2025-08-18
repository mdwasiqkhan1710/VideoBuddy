const express = require("express");
const { login, register, addToHistory, getUserHistory } = require("../controllers/user.controller");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/add_to_activity", addToHistory)
router.get("/get_all_activity", getUserHistory)

module.exports=router;