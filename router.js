const express = require('express');
const app = express();
const router = new express.Router();
const http = require('http');
const server = http.createServer(app);
const multer = require('multer');
const passwordHash = require('password-hash');

const dotenv = require('dotenv');
const mysql = require('mysql');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { fstat, rename } = require('fs');
const { send } = require('express/lib/response');
var session;
var renamedfile;

dotenv.config();
//const ip = process.env.IP_ADDRESS

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, 'files/')
    },
    filename: function (req, file, cb) {
	renamedfile = Date.now()+'-'+file.originalname;
        cb(null, renamedfile);
        
    }
})
const upload = multer({ storage: storage })

//CONNECT TO DATABASE//
var db_config = {
    connectionLimit: 10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
  };
  
  var connection;
  
  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();

////////////
router.post("/digipaevik/objekt/:id/", upload.single('filename'), (req, res) => {

    var filename2 = renamedfile;//req.file.filename /// siis kui sama nimi on tee midagi nuud magama 
    console.log("Router filename: "+filename2)
    module.exports.renamedfile = renamedfile;

    // var url = 'http://'+process.env.IP_ADDRESS+'/digipaevik/'+filename+'/' 
    //console.log(url)
    //fs.mkdir("./files/"+regUsername+"", function(err) {
    //    if (err) {
    //      console.log("Already exist");
    //      fs.unlinkSync(regUsername);
    //    }
    //    else {
    //      console.log("New directory successfully created.")
    //    }
    //});

});

router.post("/",(req,res)=>{
    var username = req.body.usname
    var password = req.body.passw 
    $query = 'SELECT * FROM task WHERE Username =' + connection.escape(username);
    connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }

    console.log("Login query succesfully executed");
    var row;
    //Getting plain text
    Object.keys(rows).forEach(function(key) {
        row = rows[key];
      });
    
    if(rows.length == 1){
        if(passwordHash.verify(password,row.Password)){
            session = req.session;
            if(rows.length > 0){

                session.useridarp = row.Username;
                console.log("UserID set");
            }
            //localStorage.setItem("Username", session.useridarp);
            //res.redirect("/");
            res.send("<script> localStorage.setItem('Username',"+"'"+session.useridarp+"'"+" ); location.replace('/'); </script>");
            
        }
        else{
            res.send("<script> localStorage.setItem('errorlog','error' ); window.history.back(); </script>");
        }
    }
    else if(rows.length == 0){
        console.log("Account does not exist");
        res.send("<script> localStorage.setItem('errorlogacc','error' ); window.history.back(); </script>");

    }
});
    
})
router.post('/objektid/',function(req,res){
    var klient = req.body.klientid
    var aadress = req.body.addressid
    var kontakt = req.body.kontaktid
    var email = req.body.klientemailid
    var telefon = req.body.telefonnr
    var system = req.body.listofsystem
    console.log(klient,'\n',aadress,'\n',kontakt,'\n',email,'\n',telefon,'\n',system )
})
router.post("/register/",(req,res)=>{
    var email = req.body.email;
    var username = req.body.usname;
    var password = req.body.passw;
    var hashedPassword = passwordHash.generate(password);
    
    $query = 'SELECT * FROM task WHERE Username =' + connection.escape(username);
    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query (Register find).");
            return;
        }
        console.log("Register find query succesfully executed");
        if(username.length < 3){
            res.send("<script> localStorage.setItem('errorreg','errorusername' ); window.history.back(); </script>");
        }
        else if(password.length <8){
            res.send("<script> localStorage.setItem('errorreg','errorpassword' ); window.history.back(); </script>");
        }
        else if(rows.length == 0){
            if(email.includes('@')){
                $query = 'INSERT INTO task (Email, Username, Password) VALUES '+ '('+'"'+email+'"'+","+'"'+username+'"'+"," +'"'+hashedPassword+'"'+')';

                    connection.query($query, function(err, rows, fields) {
                        if(err){
                            console.log("An error ocurred performing the query (Register insert).");
                            return;
                        }
                        console.log("Register insert query succesfully executed");

                        res.send("<script>localStorage.setItem('Username',"+"'"+session.useridarp+"'"+" );  localStorage.setItem('errorlog','succ'); location.replace('/'); </script>");

                    });
            }
            else{
                res.send("<script> localStorage.setItem('errorreg','erroremail' ); window.history.back(); </script>");

            }
            
        }
        else if(rows.length == 1){
            res.send("<script> localStorage.setItem('errorreg','error' ); window.history.back(); </script>");
        }

    });    
    
    
        
       

    
})
router.get('/digipaevik/:file/',(req,res)=>{
    var failinimi = req.params.file;
    res.sendFile("./files/"+failinimi+"",{root:__dirname})
});

router.get('/digipaevik/objekt/:id', (req, res) => {
    var obid = req.params.id
    $query = 'SELECT * FROM objektid WHERE ID ='+obid+'';
    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log("An error ocurred performing the query (Leia ObjektiID).");
            return;
        }
        console.log("ObjektID on leitud");
        if(rows.length ==0){
            res.send("Sellele objektile pole päevikut")
        }
        else{

            res.sendFile("./templates/paevik.html", { root: __dirname });
        }
    });
});
router.get('/', (req, res) => {
    session =req.session
    if(session.useridarp){
     res.sendFile("./templates/registered/objektid.html", { root: __dirname });

    }
    else{

        res.sendFile("./templates/login.html", { root: __dirname });
    }
});
router.get('/register/', (req, res) => {
    session =req.session
    if(session.useridarp){
        res.send("<script>location.replace('/');</script>")


    }
    else{

        res.sendFile("./templates/register.html", { root: __dirname });

    }
});

router.get('/objektid/',function(req,res){
    session = req.session
    if(session.useridarp){
        res.sendFile("./templates/registered/objektid.html",{root:__dirname})
    }
    else{
        res.send("SUL POLE LIGIPÄÄSU")
    }
})

router.get("/logout/",function(req,res){
    req.session.destroy();
    res.send('<script>localStorage.removeItem("Username"); location.replace("/")</script>')


});
module.exports.route = router;
