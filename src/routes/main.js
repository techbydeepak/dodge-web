const express= require('express')
const routes = express.Router()
const Detail= require('../models/Detail')
const Slider = require('../models/Slider')
const Service = require('../models/Service')
const Contact = require('../models/Contact')
const Banner = require('../models/Banner')
const About = require('../models/About')
const Footer = require('../models/Footer')



const currentYear = new Date().getFullYear();

routes.get('/', async (request,response) =>{

   const details = await Detail.findOne({'_id':'6807e474b35ee6fdb6495ee5'})
   const slides = await Slider.find()
   const services = await Service.find()
   const banners= await Banner.find()
   const aboutData= await About.find()
   const footers = await Footer.find()


//    console.log(footers);
   
    // response.send('this is data from routes')
    // console.log(details);
    
    response.render('index',{
        details:details,
        slides: slides,
        services: services,
        banners: banners,
        aboutData:aboutData,
        currentYear:currentYear,
        footers:footers,

    })
})

routes.get('/gallery', async (req,res) =>{
    const details = await Detail.findOne({ '_id': '6807e474b35ee6fdb6495ee5' })
    res.render('gallery',{
        details: details

    })
})

routes.post('/process-contact-form', async (req, res) =>{
    console.log('form is submitted');
    console.log(req.body);
    // save the data to db 
    try {
        const data= await Contact.create(req.body)
        console.log(data);
        res.redirect('/')
        
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
    
    
})



module.exports=routes
