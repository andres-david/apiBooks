const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "andres_db22",
        database: "appbooks"
    }
);

connection.connect( (error) => {

    if( error ){
        console.log( error );
    }
    else{
        console.log('Conexión correcta');
    }
});

module.exports = connection;