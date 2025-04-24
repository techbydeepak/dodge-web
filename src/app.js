const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const Detail = require('./models/Detail');
const Slider = require('./models/Slider');
const Service = require('./models/Service');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

// 🔄 Add these two lines for live reload (only in development)
if (process.env.NODE_ENV !== "production") {
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');

  // 🔄 Create LiveReload server and watch views + public files
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(__dirname + "/../public");
  liveReloadServer.watch(__dirname + "/../views");

  // Notify browser after server restarts
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 10);
  });

  // Inject livereload script into every rendered page
  app.use(connectLivereload());
}



// Register custom Handlebars helper 'isInRange'
hbs.registerHelper('isInRange', function (index, start, end) {
  return index >= start && index <= end;
});

app.use(bodyParser.urlencoded({
  extended: true
}))

// Middleware
const routes = require('./routes/main');
const Banner = require('./models/Banner');
const About = require('./models/About');
const Footer = require('./models/Footer');

app.use('/static', express.static('public'));
app.use('', routes);

// View engine
app.set('view engine', 'hbs');
app.set('views', 'views');
hbs.registerPartials('views/partials');
hbs.registerHelper('isOdd', function (index) {
  return index % 2 !== 0;
});

// MongoDB connection (with fallback to local database if .env is missing)
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/website_tut';
mongoose.connect(mongoURL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// ===================== INSERT NAVBAR DATA =====================
/*
const navbarData = new Navbar({
  brandName: "SpeedTorque",
  brandIconUrl: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
  links: [
    { label: "Home", url: "/" },
    { label: "Services", url: "/services" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" }
  ]
});
navbarData.save();
*/

// ===================== INSERT SLIDER DATA =====================
/*
const sliderData = new Slider({
  title: "Muscle Machines",
  subTitle: "Unleash The Beast",
  imageUrl: "https://cdn.pixabay.com/photo/2017/09/09/21/50/automobile-2738368_1280.jpg"
});
sliderData.save();
*/

// ===================== INSERT SERVICES DATA =====================
/*
const serviceData = [
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Custom Mods",
    description: "Enhance your ride with pro mods",
    linkText: "Explore",
    link: "/services"
  },
  {
    icon: "fa-solid fa-gas-pump",
    title: "Fuel Tuning",
    description: "Get the best mileage & power",
    linkText: "Know More",
    link: "/services"
  },
  {
    icon: "fa-solid fa-car-battery",
    title: "Battery Care",
    description: "Long-lasting and fast-charging",
    linkText: "Check Now",
    link: "/services"
  }
];
Service.insertMany(serviceData);
*/

// Banner Data 
/*
Banner.create([
  {
    title: "Unleash the Beast",
    description: "Experience the raw power and timeless design of classic muscle cars. Built for speed, crafted for legends.",
    imageUrl: "/static/images/banner1.jpeg"
  },
  {
    title: "Built for Power, Driven by Passion",
    description: "Unleash the roar of your ride with our top-tier muscle car customizations. Crafted for speed, styled for dominance.",
    imageUrl: "/static/images/banner2.avif"
  },
])
*/

// About Section 
/*
About.create({
  title: "About The Muscle Garage",
  name: "The Muscle Garage",
  description: "Where raw power meets timeless design. We are passionate about preserving the legacy of classic muscle cars, bringing speed, strength, and soul to every story.",
  description2: "From iconic builds to custom rides, we celebrate the bold spirit of every gearhead. Join us on a journey where engines roar, hearts race, and history drives forward."
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
*/

// Footer section 
/*
Footer.create({
  title:'MUSCLE GARAGE',
  subtitle:'Fueled by passion. Driven by power.'
})
*/

// Start server (use environment variable or default to local port)
const PORT = process.env.PORT || 5556;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
