const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fc7981377d19a117ca4913d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dcykyv4ye/image/upload/v1607097010/YelpCamp/bptsvidvkgoaklvocut2.jpg',
                    filename: 'YelpCamp/bptsvidvkgoaklvocut2'
                },
                {
                    url: 'https://res.cloudinary.com/dcykyv4ye/image/upload/v1607163739/YelpCamp/jwuhoubb6s0fnc6faoyw.jpg',
                    filename: 'YelpCamp/jwuhoubb6s0fnc6faoyw'
                }
            ],
            geometry: {
                coordinates: [100.51667, 13.75],
                type: 'Point',
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})