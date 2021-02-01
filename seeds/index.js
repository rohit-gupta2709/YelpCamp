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
            author: '6017e5c67636471e848d9297',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/yelpimageasset/image/upload/v1612210168/YelpCamp/litwrq0tc3b0dgamy5ch.jpg',
                    filename: 'YelpCamp/litwrq0tc3b0dgamy5ch'
                },
                {
                    url: 'https://res.cloudinary.com/yelpimageasset/image/upload/v1612210168/YelpCamp/rtrevnx9frihzuzlhc6g.jpg',
                    filename: 'YelpCamp/rtrevnx9frihzuzlhc6g'
                },
                {
                    url: 'https://res.cloudinary.com/yelpimageasset/image/upload/v1612210168/YelpCamp/qalz8rvxxqbcgobml8bt.jpg',
                    filename: 'YelpCamp/qalz8rvxxqbcgobml8bt'
                }
            ],
            reviews: [
                '6017f5753610c42ac47869a1'
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})