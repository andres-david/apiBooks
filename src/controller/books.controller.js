const connection = require("../database");


function getStart( request, response ){
    let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
    response.send( respuesta );
    next();
}

function getBooks( request, response ){

    let sql;

    if(request.query.id_usuario && request.query.id_libro){
        // sql = "SELECT id_libro, id_usuario, titulo, tipo, autor, precio, libro.foto FROM appbooks.libro WHERE libro.id_libro='" + request.query.id_libro +"' AND id_usuario='" + request.query.id_usuario +"'";
        sql = "SELECT * FROM libro WHERE id_libro =" + request.query.id_libro + " AND id_usuario=" + request.query.id_usuario;
    }
    else if(request.query.id_usuario){
        // sql = "SELECT id_libro, titulo, tipo, autor, precio, foto FROM appbooks.libro WHERE id_usuario='" + request.query.id_usuario +"'";
        sql = "SELECT * FROM libro WHERE id_usuario ="  + request.query.id_usuario
    }
        
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            response.send(result);
        }
    });

}

function postBooks( request, response ){

    console.log(request.body);

    let sql = "INSERT INTO libro (id_usuario, titulo, tipo, autor, precio, foto)" + 
    "VALUES ('" + request.body.id_usuario + "', '" +
                    request.body.titulo + "', '" +
                    request.body.tipo + "', '" +
                    request.body.autor + "', '" +
                    request.body.precio + "', '" +
                    request.body.foto + "')"; 

    console.log(sql);
    connection.query(sql, (err, result) => {
        if( err ){
            console.log( err );
        }
        else{
            console.log(result);
            if(result.insertId){
                response.send(String(result.insertId));
            }
            else{
                response.send(result);
            }
        }
    })

}

function putBooks( request, response ){

    console.log(request.body);

    let id_usuario = request.body.id_usuario ? request.body.id_usuario: null;
    let id_libro = request.body.id_libro ? request.body.id_libro : null;
    let titulo   = request.body.titulo ? request.body.titulo : null;
    let tipo     = request.body.tipo ? request.body.tipo : null;
    let autor    = request.body.autor ? request.body.autor : null;
    let precio   = request.body.precio ? request.body.precio : null;
    let foto     = request.body.foto ? request.body.foto : null;
    let params   = [id_usuario, titulo, tipo, autor, precio, foto, id_libro];

    let sql = "UPDATE libro SET id_usuario = COALESCE(?, id_usuario) , " + 
               "titulo = COALESCE(?, titulo), " + "tipo = COALESCE(?, tipo), " + "autor = COALESCE(?, autor), " +
               "precio = COALESCE(?, precio), " + "foto = COALESCE(?, foto) WHERE id_libro = ?";
    console.log(sql); 
    connection.query(sql, params,function (err, result) 
    {
        if (err) 
            console.log(err);
        else 
        {
            response.send(result);
        }
    }); 

}

function deleteBooks(request, response){

    let id = request.query.id_libro;
    params = [id];

    let dele = `DELETE FROM libro WHERE id_libro=?`;

    connection.query(dele, params, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log("Libro borrado");
            console.log(result);
        }
        response.send(result)
    });
}


module.exports = {getStart, getBooks, postBooks, putBooks, deleteBooks};
