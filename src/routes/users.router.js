const { Router } = require("express");
const router = Router();
const usersCtrl = require("../controller/users.controller");


router.get( "/", usersCtrl.getStart );

// router.get( "/alumnos/:id", alumnosCtrl.getAlumnos);

// router.get( "/alumnos", alumnosCtrl.getAlumnos);

router.post( "/registro", usersCtrl.postUser);

router.post( "/login", usersCtrl.postLogin);

// router.put( "/alumnos", alumnosCtrl.putAlumnos ); 

// router.delete( "/alumnos", alumnosCtrl.deleteAlumno );


module.exports = router;