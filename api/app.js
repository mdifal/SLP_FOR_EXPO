//lib that loaded
const express = require('express');
// const logging = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
//express as a function
const app = express();
const path_main = require('path');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const routesIndex = require('./routes');
const config = require('./config/config.json');
const host = config.development.host;


app.use(bodyParser.json());
app.use(cookieParser());

const path = path_main.join(__dirname, "./logapi");
const fileName = '/access.log';
try {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
} catch (err) {
    console.error(err);
}
var writeFile = fs.createWriteStream(path + fileName, { flags: 'a' });
// app.use(logging('combined', { stream: writeFile }));

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path + "/error.log", level: "error" }),
        new winston.transports.File({ filename: path + "/info.log", level: "info" }),
    ]
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'
        );
        return res.status(200).json({});
    }
    next();
});

// app.get('/', (req, res) => {
//   res.send('Welcome to the main page!');
// });

app.use('/', routesIndex);

// Use your routes here
// app.use('/class-schedules', jadwalKelasRoutes);
// app.use('/leave-requests', dataPengajuanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on host ${host} port ${PORT}`);
});

//Handling incorrect url & db con error
app.use((req, res, next) => {
    var error = new Error('Not Found');
    console.log("(false URL)"); //this is me trying to log the error(s) related to incorrect URL
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log("Error");
    console.log("(db error)"); //this is me trying to log the error(s) related to DB error
    logger.error(error)
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

//module export
module.exports = app;