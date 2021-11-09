// Generacion de módulos
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT||3000; //determinación del puerto a utilizar
//-----------------------
const app = express();
//app.use(bodyParser.json()) // está obsoleto
app.use(express.json()); 
// Generacion de datos para la conexión
var connection = mysql.createConnection(
    { //datos de conexion
        host: 'www.cursophp.com.ar',
        user: 'root',
        password:'fullstack',
        database: 'normalizacion',
        port: '3306'
    }
);

// llamada al directorio principal 
app.get('/',(req,res)=>
{
    res.send('<h1>Bienvenido al servidor Node + MySql!</h1>')
}
);

// llamada al listado 
app.get('/listado',(req,res)=>
{
    res.send('<h1>Estás en el sector de listados</h1>')
}
);

// llamada a consultas. Ej nro de socio.
app.get('/consultas/:nro',(req,res)=>
{
    const {nro} =req.params; //las llaves indican que solo tome el valor de nro del conjunto de datos sino imprime nro: '24'
    console.log(nro);
    res.send('<b>Estas en el sector de consultas</b>')
}
);

app.listen(PORT, () => console.log(`Servidor Up en puerto Nro ${PORT}`)) //notación back tics key