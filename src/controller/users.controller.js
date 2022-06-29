const connection = require("../database")


function getStart( request, response ){
    let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
    response.send( respuesta );
    next();
}

function postUser( request, response ){

    console.log(request.body);


    let sql= "INSERT INTO usuario (nombre, apellidos, correo, foto, password)" +
    "VALUES ('"+ request.body.nombre+ "','" + request.body.apellidos +"','" + request.body.correo +"','"+ request.body.foto+"','"
                + request.body.password+"')"

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
                response.send("-1");
            }
        }
    })

}

function postLogin( request, response ){

    console.log(request.body);

    let correo = request.body.correo;
    let password = request.body.password;

    sql = "SELECT id_usuario, nombre, apellidos, correo, foto FROM usuario WHERE (correo= '"+correo+"'AND password= '"+password+"')"

    console.log(sql);
    connection.query(sql, (err, result) => {
        if( err ){
            console.log( err );
        }
        else{
            
            if(result.length > 0){
                let json = {
                    error: false,
                    message: "Datos correctos",
                    result: result
                };
                response.send(json)
            }
            else{
                let arr = {
                    error: true,
                    message: "Datos incorrectos",
                    result: result
                };
                response.send(arr)
            }

        }
    })

}




module.exports = {getStart, postUser, postLogin};
