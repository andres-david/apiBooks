const connection = require("../database");


function getStart( request, response ){
    let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
    response.send( respuesta );
    next();
}

function getBooks( request, response ){

    let sql;
    
    if( request.query.nombre ){
        sql = "SELECT id_libro, titulo, tipo, autor, precio, libro.foto FROM appbooks.libro JOIN usuario ON (libro.id_usuario = usuario.id_usuario) WHERE nombre='" + request.query.nombre +"'";
    }
    else if(request.params.id){
        sql = "SELECT id_libro, id_usuario, titulo, tipo, autor, precio, libro.foto FROM appbooks.libro WHERE id_libro='" + request.params.id +"'";
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

    let id_usuario = request.body.id_usuario;
    let id_libro = request.body.id_libro;
    let titulo   = request.body.titulo;
    let tipo     = request.body.tipo;
    let autor    = request.body.autor;
    let precio   = request.body.precio;
    let foto     = request.body.foto;
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

    let id = request.body.id_libro;
    params = [id];

    let dele = `DELETE FROM libro WHERE id_libro=?`;

    connection.query(dele, params, (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log("Nota borrada");
            console.log(result);
        }
        response.send(result)
    });
}


module.exports = {getStart, getBooks, postBooks, putBooks, deleteBooks};
