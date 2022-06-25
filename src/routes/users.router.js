const { Router } = require("express");
const router = Router();
const usersCtrl = require("../controller/users.controller");


router.get( "/", usersCtrl.getStart );

router.post( "/registro", usersCtrl.postUser);

router.post( "/login", usersCtrl.postLogin);

module.exports = router;