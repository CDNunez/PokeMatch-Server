// import dependencies and schema
const fs = require('fs');
const PokemonSchema = require('../../../models/pokemonModel');

// async to load in database

async function loadGenOne(){
    try {
        //counts documents in mongodb
        const count = await PokemonSchema.countDocuments();
        // if database already exists, function wont run
        if(count === 0) {
            //read through json file
            const data = fs.readFileSync('./database/PokeDex/GenOne/genOne.json', 'utf-8');
            //parse through individual data
            const jsonData = JSON.parse(data);
            //convert data into objects
            const pokemon = Object.values(jsonData.pokedex);
            //log for confirm.
            // console.log(pokemon)
            //await read, parse, object, then insert many to mongodb
            await PokemonSchema.insertMany(pokemon)
            //log confirm.
            console.log('Gen One Loaded');
        } else {
            console.log('Data already exists');
        }
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
}

module.exports = loadGenOne;