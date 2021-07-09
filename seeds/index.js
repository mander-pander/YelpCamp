const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60d0b4aee361153eb3a941ef',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ullam incidunt consequatur praesentium magnam, explicabo, rem rerum cumque facilis voluptatibus voluptate quos adipisci quas expedita? Magnam esse unde nihil omnis!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dgpet2y0h/image/upload/v1625858857/YelpCamp/npugu3ec1pvox1k2uysg.jpg',
                  filename: 'YelpCamp/npugu3ec1pvox1k2uysg'
                },
                {
                  url: 'https://res.cloudinary.com/dgpet2y0h/image/upload/v1625858859/YelpCamp/hwlgp1nhga84yryopg6i.jpg',
                  filename: 'YelpCamp/hwlgp1nhga84yryopg6i'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})