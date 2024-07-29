const Product = require("../modules/Product");
const Category = require("../modules/Category");
const { verifyToken } = require("../lib/utils");
const axios = require('axios');

let temperatore;

const showShop = async (req, res) => {
    try {
        const products = await Product.find();
        const categories = await Category.find();
        
        // weather
        const city = 'tel aviv'
        const url_location = `http://api.openweathermap.org/geo/1.0/direct?appid=${process.env.WEATHER_KEY}`;
        const url_weather = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_KEY}`;
        let full_url = `${url_location}&q=${city}`;
        const api_res = await axios.get(full_url);

        if((api_res.data) && (api_res.data.length > 0)){
            const lon = api_res.data[0].lon;
            const lat = api_res.data[0].lat;
            
            const weather = `${url_weather}&lon=${lon}&lat=${lat}`;

            const weather_ress = await axios.get(weather);
            temperatore = weather_ress.data.main.temp
        }
        else
        {
           return res.status(404).send("No results found");
        }
        req.temperatore = temperatore;
        res.render("index", {user: verifyToken(req.cookies.token), token: req.cookies.token, products, categories:[{}, ...categories], temperatore});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong. Input should be in English only");
    }
}

const showCart = async (req, res) => {
    res.render("cart", {user: verifyToken(req.cookies.token), token: req.cookies.token,temperatore});
}

module.exports = {
    showShop,
    showCart
};