const mongoose = require('mongoose');

exports.connectDB = () => {
    mongoose.connect(process.env.URI);
    const database = mongoose.connection;

    database.on('error', (error) => {
        console.log(error);
    });

    database.once('connected', () => {
        console.log(`Now listening on port ${process.env.PORT}`);
    });
}