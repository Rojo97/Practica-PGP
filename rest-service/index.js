const app = require('./app').app;
const port = 8080;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})