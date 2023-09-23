const http = require('http');
// Importa el módulo http de Node.js. Este módulo
// proporciona funcionalidad para crear servidores HTTP
// y manejar solicitudes y respuestas HTTP.
const hostname = '127.0.0.1';
// Define la dirección IP en la que el servidor escuchará las solicitudes.
// En este caso, es '127.0.0.1', que se refiere a la dirección IP local (localhost).
const port = 3000;
// Define el puerto en el que el servidor escuchará las solicitudes.
// En este caso, el puerto es 3000.
const server = http.createServer( (req, res) => {
    // Crea el servidor HTTP utilizando la función createServer del módulo http.
    // Esta función toma como argumento una función de devolución de llamada (callback)
    // que se ejecutará cada vez que se reciba una solicitud HTTP.
    // La función de devolución de llamada toma dos argumentos: req 
    //(la solicitud entrante) y res (la respuesta que se enviará al cliente).
    res.statusCode = 200;
    // Establece el código de estado de la respuesta en 200, lo que significa "OK".
    // Esto indica que la solicitud se ha procesado correctamente.


    // res.setHeader('Content-Type', 'text/plain');
    //configura el encabezado de respuesta para indicar que el contenido de
    // la respuesta es de tipo 'text/plain'.
    // Esto significa que el contenido de la respuesta es texto sin formato.


    //res.setHeader('Content-Type', 'application/json');
    // aqui muestra el contenido en tipo json

    res.setHeader('Content-Type', 'text/html');
    // aqui muestra el contenido en tipo html

    //res.end(JSON.stringify({mensaje: 'Hola Mundo 1'}));
    // res.end('Hola Mundo');
    res.end('<h1>Hola Mundo</h1>');
});

server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});
//Llama al método listen del servidor para que comience a escuchar en el puerto
//  y la dirección IP especificados. Cuando el servidor esté escuchando, 
//  se ejecutará la función de devolución de llamada proporcionada como tercer 
//  argumento, que en este caso imprime un mensaje en la consola indicando 
//  que el servidor está en funcionamiento y en qué dirección y puerto está escuchando.

//Prueba para estos animalitos