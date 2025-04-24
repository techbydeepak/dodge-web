const mongoose = require('mongoose')

const Footer = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    subtitle:{
        type:String,
        required: true,
    }
})

module.exports=mongoose.model('footer' , Footer)