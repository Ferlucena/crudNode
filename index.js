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

// llamada al directorio raiz 
app.get('/',(req,res)=>
{
    res.send('<h1>Bienvenido al servidor Node + MySql!</h1>')
}
);

// llamada al listado 
app.get('/listado',(req,info)=>
{ //info.send('Estas en el sector listados - GET'); --> esta linea produce error se solapa con info.json
    const consultasql= 'SELECT * FROM personas ORDER BY edad DESC, apellido'; //ESTO ES UNA QUERY
                                                                             //la buena practica es traer el atributo o los atributos particulares que necesite y no *
    connection.query(consultasql, (error,resultados)=>{ //ejecuta la query con catch try, es decir se fija si da error o resultado
        if(error) throw error;
        if(resultados.length > 0){ // aqui chequeo que resultados obtuve de la base de datos
            info.json(resultados); // de esta manera envío los resultados de la BD en formato json por el parámetro info de app al inicio
        }else{
            info.send('No se encontraron datos en la BD');
        }
    }); 
}
);

//llamada por metodo post
app.post('/listado',(req,res)=>
{
    res.send('<h1>Estás en el sector de listados - POST</h1>')
}
);

// llamada a consultas. Ej nro de socio.
app.get('/consultas/:nro',(req,res)=>
{
    const {nro} =req.params; //las llaves indican que solo tome el valor de nro del conjunto de datos sino imprime nro: '24'
    if (isNaN(Number(nro))){
        res.send('Estás en el sector de consultas - No escribiste número');
    }else{
        console.log(Number(nro));
        res.send('Estás en el sector consultas - Dato correcto')
    }

    console.log(nro);
    res.send('<b>Estas en el sector de consultas</b>')
}
);

// Nuevo dato
app.post('/nueva',(req,res)=>
{
    res.send('Alta de un dato');
}
);

// Elimintar dato
app.delete('/borrar/:nro',(req,res)=>
{
    res.send('Eliminar de un dato');
}
);

// Modificar un dato
app.put('/cambiar/:nro',(req,res)=>
{
    res.send('Modificar de un dato');
}
);

app.listen(PORT, () => console.log(`Servidor Up en puerto Nro ${PORT}`)) //notación back tics key

