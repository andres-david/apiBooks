const connection = require("../database");


function getStart( request, response ){
    let respuesta = {error: true, codigo: 200, mensaje: 'Punto de inicio'};
    response.send( respuesta );
    next();
}

function getNotas( request, response ){

    let sql;
    
    if( request.params.id ){
        sql = "SELECT * FROM marks WHERE id_mark=" + request.params.id;
    }
    else{
        sql = "SELECT * FROM marks";
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

function postNotas( request, response ){

    console.log(request.body);

    let sql = "INSERT INTO marks (date, mark) " + 
                "VALUES ('" + request.body.date + "', '" +
                                request.body.mark + "')";

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

function putNotas( request, response ){

    console.log(request.body);

    let date = request.body.date;
    let mark = request.body.mark;
    let id_mark = request.body.id_mark;
    let params = [date, mark, id_mark];

    let sql = "UPDATE marks SET date = COALESCE(?, date) , " + 
               "mark = COALESCE(?, mark)  WHERE id_mark = ?";
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

function deleteNota(request, response){

    let id = request.body.id_mark;
    params = [id];

    let dele = `DELETE FROM marks WHERE id_mark=?`;

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


module.exports = {getStart, getNotas, postNotas, putNotas, deleteNota};
