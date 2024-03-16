//?Dependencies
require('dotenv').config();
const express = require('express');
const app = express();

//?Configurations
const PORT = process.env.PORT;
const IP = process.env.IP;
const MONGO = process.env.MONGODB;
const DBNAME = process.env.DBNAME;

//?Database Connection
const db = require('./helpers/db');
const loadGenOne = require('./database/PokeDex/GenOne/loadGenOne');

db()
    .then(()=> {
        console.log(`Database connected to: ${MONGO}/${DBNAME}`);
        loadGenOne();
    })
    .catch((err)=>console.error(err));

app.use(express.json());
app.listen(PORT, () => console.log(`PokeMatch running on: ${IP}${PORT}`));