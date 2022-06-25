const { Router } = require("express");
const router = Router();
const booksCtrl = require("../controller/books.controller");


router.get( "/l", booksCtrl.getStart );

router.get( "/libros/:id", booksCtrl.getBooks);

router.get( "/libros", booksCtrl.getBooks);

router.post( "/libros", booksCtrl.postBooks);

router.put( "/libros", booksCtrl.putBooks); 

router.delete( "/libros", booksCtrl.deleteBooks);


module.exports = router;