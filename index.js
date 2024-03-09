require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT;

const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}/PokeMatch`);

const db = mongoose.connection;
db.once('open', () => console.log(`Connected: ${MONGO}/PokeMatch`));
app.use(express.urlencoded());
app.use(express.json());

app.listen(PORT, () => console.log(`PokeMatch: ${PORT}`));