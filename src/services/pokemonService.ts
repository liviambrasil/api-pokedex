import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";

async function addPokemon (pokemonId:number) {
    await getRepository(Pokemon).update({id: pokemonId},{inMyPokemons: true})
}

async function removeUserPokemon(pokemonId:number) {
    await getRepository(Pokemon).update({id: pokemonId},{inMyPokemons: false})
}

async function getAllPokemons() {
    const pokemons = await getRepository(Pokemon).find()

    return pokemons
}

export { addPokemon, removeUserPokemon, getAllPokemons }