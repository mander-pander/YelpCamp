const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

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
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dgpet2y0h/image/upload/v1626733583/YelpCamp/tyvy7us47zspavq9tv3x.jpg',
                  filename: 'YelpCamp/tyvy7us47zspavq9tv3x'
                },
                {
                  url: 'https://res.cloudinary.com/dgpet2y0h/image/upload/v1626225102/YelpCamp/trf3xjtkcuvabgwgk4yq.jpg',
                  filename: 'YelpCamp/trf3xjtkcuvabgwgk4yq'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})