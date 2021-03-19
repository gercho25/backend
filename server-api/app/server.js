var express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth');
const configRoutes = require('./routes/config');
const mainRoutes = require('./routes/main');
const verifyToken = require('./routes/validate-token');

var app = express(); 

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Todos los dominios
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/config', verifyToken, configRoutes);
app.use('/api', mainRoutes);


var port = process.env.PORT || 9000;
app.listen(port);
console.log('API escuchando en el puerto ' + port);




// Conexión a Base de datos
const uri = `mongodb://localhost:27017/${process.env.DBNAME}`;
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Base de datos conectada')
}).catch(e => {
    console.log('error db:', e)
});