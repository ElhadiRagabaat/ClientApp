const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("./routes/index")
const path = require('path');                
const PORT = process.env.PORT || 3001;     
require('dotenv').config();                 

const cors = require("cors")
const app = express()
app.use(cors())


//const LOCAL_DB = "mongodb://127.0.0.1:27017/my_local_db";
//mongoose.connect(process.env.MONGODB_URI || LOCAL_DB, { useNewUrlParser: true });
//let MONGODB_URI= 'mongodb+srv://ahmad:ahmad@cluster0.vm3fk.mongodb.net/Articles?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/api",router)


 if (process.env.NODE_ENV === 'production') {        
     app.use(express.static('client/build'));
  
     app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client'/ 'build', 'index.html'));
    });
   }
  

let port = 3001;
app.listen(port,()=>{
    console.log(`Server listen on port ${port}`)
})
