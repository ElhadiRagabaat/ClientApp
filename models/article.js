const mongoose = require('mongoose')

const aricleSchema = new mongoose.Schema({
title:{
    type:String,
    
    required:[true ,"The title is not found"]
},
content:{
    type:String,
    required:true

}

})

module.exports = mongoose.model("Articale",aricleSchema)