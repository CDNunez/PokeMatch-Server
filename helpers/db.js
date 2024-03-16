const mongoose = require('mongoose');
const {MONGODB, DBNAME} = process.env;

const db = async () => {
    try {
        await mongoose.connect(`${MONGODB}/${DBNAME}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};

module.exports = db;