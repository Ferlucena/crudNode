// Generacion de módulos
// Instalo el modulo npm i cors para seguridad
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
//Determinacion del puerto a utilizar
const PORT = process.env.PORT||3000; //determinación del puerto a utilizar
//-----------------------
const app = express();
app.use(cors());
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
app.get('/listados',cors(), (req,info)=> //cors es un middleware es un proceso entre el front y el back
{ //info.send('Estas en el sector listados - GET'); --> esta linea produce error se solapa con info.json
    const consultasql= 'SELECT id,nombre,apellido,edad FROM personas ORDER BY edad DESC, apellido'; //ESTO ES UNA QUERY
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
app.get('/consultas/:nro',(req,info)=>
{ //consulta sin la validación de si es o no numérico
    const {nro} = req.params;
    const consultasql= `SELECT id,nombre,apellido,edad FROM personas WHERE id = ${nro}`; 
    connection.query(consultasql, (error,resultados)=>{ 
        if(error) throw error;
        if(resultados.length > 0){ 
            info.json(resultados); 
        }else{
            info.send('No se encontraron datos en la BD');
        }
    }); 
}
);

// Nuevo dato
app.post('/nueva',(req,res)=>
{   //Realizo un INSERT en la tabla sin saber que datos insertar
    const sql = 'INSERT INTO personas SET ?';

    // SET DE DATOS - Inserto nuevo dato en formato array pidiendo los datos al body mendiante JS
    const nuevodato = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        provincia: req.body.provincia
    }; 
    
    //Esta seccion es la que reemplaza '?' en const sql 
    connection.query(sql, nuevodato, error =>{ 
        if(error) throw error;
        res.send('Alta dada correctamente');
        console.log("Update OK");
    }
    );
}
);

// Elimintar dato
app.delete('/borrar/:nro',(req,res)=>
{ 
    const {nro} = req.params;
    const consultasql= `DELETE FROM personas WHERE id = ${nro}`; 
    connection.query(consultasql, (error,resultados)=>{ 
        if(error) throw error;
        res.send('No encontré datos')
    }
    );
}
);

// Modificar un dato
app.put('/cambiar/:nro',(req,res)=>
{ 
    const {nro} = req.params;
    const {nombre,apellido} = req.body; //estos parametros no vienen cargado en la dire url lo implementaremos en el cuerpo de la solidictud del serv web
                                       //req.body envio los datos desde el body con JS para reemplazar los datos
    const consultasql= `UPDATE personas SET nombre = '${nombre}', apellido = '${apellido}' WHERE id = ${nro}`; 
    connection.query(consultasql, (error,resultados)=>{ 
        if(error) throw error;
        res.send('Dato modificado correctamente')
    }
    );
}
);

app.listen(PORT, () => console.log(`Servidor Up en puerto Nro ${PORT}`)) //notación back tics key

