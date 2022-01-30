const express = require('express');
const app = express();
const router = require('./router')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const sessions = require('express-session');
const mysql = require('mysql');
const { connect } = require('http2');

dotenv.config();
const port = process.env.PORT || process.env.SERVER_PORT;
//COOKIES//
const oneDay = 1000 * 60 * 60 * 24;
const long = 30 * 86400 * 1000;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: long },
    resave: false
}));


//CONNECT TO DATABASE//
var db_config = ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

var connection;
function handleDisconnect(){
    connection = mysql.createConnection(db_config); 

    connection.connect(function (err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
            setTimeout(handleDisconnect, 2000);
        }
    });
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
          handleDisconnect();                         
        } else {                                      
          throw err;                                  
        }
      });
}
handleDisconnect();


////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());



app.use('/static', express.static("static"));
app.use("/", router);
var allClients = [];
io.on('connection', (socket) => {
    allClients.push(socket);
    socket.on('join objektid',function(data){
        $query = 'SELECT * FROM objektid ORDER BY ID DESC';
        connection.query($query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query (LAE OBJEKTID).");
                return;
            }
            console.log("OBJEKTID LAETI EDUKALT");
            io.to(socket.id).emit('join objektid send', rows)

           
        });
        socket.on("disconnect", function () {
            var i = allClients.indexOf(socket);
            console.log("Got dissconnected");
            allClients.splice(i, 1);

        });
    })
    socket.on("join", function (data) {
        $query = 'SELECT * FROM paevikud WHERE ObjektID='+'"'+data.id+'"';
        connection.query($query, function (err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query (LOAD PÄEVIK).",err);
                return;
            }
            console.log("KÕIK SÜNDMUSED EDUKALT LAETUD");
            $query = 'SELECT * FROM objektid WHERE ID ='+'"'+data.id+'"';
            connection.query($query, function(err, rows2, fields) {
                if(err){
                    console.log("An error ocurred performing the query (Register find).");
                    return;
                }
                console.log("PÄEVIK LAETI EDUKALT");
                
                //console.log(rows2)
                io.to(socket.id).emit('join_send_objekt', rows2)

               
            });
            io.to(socket.id).emit('join_send', rows)
        });
        console.log(data.action);
        socket.on("disconnect", function () {
            var i = allClients.indexOf(socket);
            console.log("Got dissconnected");
            allClients.splice(i, 1);

        });
    });

    socket.on("addItem", function (data) {
        var url = '';
        //console.log('SIIN',data.failinimi)
        
        if (!data.failinimi.includes('.')) {
            url = "NONE"
        }
        else {
            url = 'http://' + process.env.IP_ADDRESS + ':3000/digipaevik/' + data.failinimi + '/'
        }
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        $query = 'INSERT INTO paevikud (Tegija,Liik,Süsteem,Sisu,Kuupäev,FileURL,ObjektID) VALUES ' + '(' + '"' + data.Tegija + '"' + "," + '"' + data.Liik + '"' + "," + '"' + data.Süsteem + '"' + "," + '"' + data.Sisu + '"' + "," + '"' + dateTime + '"' + "," + '"' + url + '"' +  "," + '"' + data.id + '"'+')';
        connection.query($query, function (err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query (Loo uus).");
                return;
            }
            console.log("UUS SÜNDMUS ON LOODUD");
            $query = 'SELECT * FROM paevikud WHERE ObjektID ="'+data.id+'" ORDER BY ID DESC LIMIT 1';
            connection.query($query, function (err, rows, fields) {
                if (err) {
                    console.log("An error ocurred performing the query (Loo uus).");
                    return;
                }
                console.log("UUS SÜNDMUS ON LISATUD");
                io.emit("addItem_send", rows)

            });

        });
    })

    socket.on('objectitem', function (data){
        //console.log(data)
        $query = 'INSERT INTO objektid (Klient,Aadress,Kontakt,Email,Telefon,Süsteem) VALUES' + '(' + '"' + data.klient + '"' + "," + '"' + data.aadress + '"' + "," + '"' + data.kontakt + '"' + "," + '"' + data.email + '"' + "," + '"' + data.telefon + '"' + "," + '"' + data.system + '"' + ')';
        connection.query($query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query (Lisa Objekt DB).");
                return;
            }
            $query = 'SELECT * FROM objektid ORDER BY ID DESC LIMIT 1';
            connection.query($query, function(err, rows, fields) {
                if(err){
                    console.log("An error ocurred performing the query (Get newest data from DB).",err);
                    return;
                }
                console.log("UUENDA IGAT LEHTE LISADES OBJEKTI");
                io.emit('objectitem_send',rows)
               
            });
            console.log("Objekt edukalt lisatud andmebaasi.");
           
        });
    })
    socket.on('detailedObject',function(data){
        $query = 'SELECT * FROM objektid  WHERE ID ='+data.id;
        connection.query($query, function(err, rows, fields) {
            if(err){
                console.log("An error ocurred performing the query (DETAILED OBJECT ID ERROR).",err);
                return;
            }
            io.to(socket.id).emit('detailedObject_send',rows)
            console.log("DETAILED OBJECT ID WAS SUCCESSFUL");
           
        });
    });

});
app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: "Not found"
    })
   })

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send("Something Broke!");
   })

server.listen(port, () => {
    console.log('Server online on port', port);
});