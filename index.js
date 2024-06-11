//?Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//?Configurations
const PORT = process.env.PORT;
const IP = process.env.IP;
const MONGO = process.env.MONGODB;
const DBNAME = process.env.DBNAME;

//?Routes
//*User Route
const userRoute = require('./routes/userRoutes');
//*Poke Team Route
const teamRoute = require('./routes/teamRoutes');
//*Pokemon Route
const pokeRoute = require('./routes/pokemonRoutes');

//?Database Connection
const db = require('./helpers/db');
const loadGenOne = require('./database/PokeDex/GenOne/loadGenOne');
const { required } = require('joi');

db()
    .then(()=> {
        console.log(`Database connected to: ${MONGO}/${DBNAME}`);
        loadGenOne();
    })
    .catch((err)=>console.error(err));

app.use(express.json());
app.listen(PORT, () => console.log(`PokeMatch running on: ${IP}${PORT}`));

//?App.Use
app.use(cors());
//*User Route
app.use('/user', userRoute);
//*Poke Team Route
app.use('/poketeam', teamRoute);
//*Pokemon Route
app.use('/pokemon', pokeRoute);