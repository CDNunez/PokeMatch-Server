const fs = require('fs');
const PokemonSchema = require('../../../models/pokemonModel');

async function loadGenOne(){
    try {
        const count = await PokemonSchema.countDocuments();
        if(count === 0) {
            const data = fs.readFileSync('./database/PokeDex/GenOne/genOne.json', 'utf-8');
            const jsonData = JSON.parse(data);
            const pokemon = Object.values(jsonData.pokedex);
            console.log(pokemon)
            await PokemonSchema.insertMany(pokemon)
            console.log('Gen One Loaded');
        } else {
            console.log('Data already exists');
        }
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
}

module.exports = loadGenOne;