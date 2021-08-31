const express = require('express')
const app = express();
const cors = require('cors');
const db_config = require('./config/database.config')
const cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    var cpuCount = parseInt(cpuCount / 2);

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {

        // Replace the dead worker, we're not sentimental
        console.log('Worker %d died :(', worker.id);
        cluster.fork();

    });

    // Code to run if we're in a worker process
}else{

  process.on('SIGTERM', signal => {
    console.log(`Process ${process.pid} received a SIGTERM signal`)
    process.exit(0)
  })
  
  process.on('SIGINT', signal => {
    console.log(`Process ${process.pid} has been interrupted`)
    process.exit(0)
  })

  process.on('uncaughtException', (err,rr) => {
    console.log('Uncaught Exception:',err,rr)
    process.exit(1)
  })

  process.on('unhandledRejection', (promise, reason) => {
    console.log('Unhandled rejection at ', promise, `reason:`, reason)
    process.exit(1)
  })

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors())

app.use((req, res, next) => {

   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    app.use(express.static('public'));

    next();
})


require('./app/routes/users.routes')(app);

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function () {
    console.log('Server started, listening on port ' + app.get('port'));
});

server.timeout = 100000000;

const loggers = require('express-logger');
app.use(loggers({ path: "./logfile.txt" }));
module.exports = app;

}


