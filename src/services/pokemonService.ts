import { getRepository } from "typeorm";
import { userPokemon } from "../controllers/pokemonController";
import Pokemon from "../entities/Pokemon";
import Pokemon_User from "../entities/PokemonUser";

async function addPokemon (userId: number, pokemonId:number) {
    await getRepository(userPokemon).insert({userId, pokemonId})
}

async function removeUserPokemon(userId: number, pokemonId:number) {
    await getRepository(userPokemon).delete({userId, pokemonId})
}

async function getUserPokemons (userId: number) {
    const pokemonsById = await getRepository(userPokemon).find({userId})

    const arrPokemonsId = pokemonsById.map((pokemon: Pokemon_User) => pokemon.pokemonId)

    const pokemons = await getRepository(Pokemon).findByIds([arrPokemonsId])

    return pokemons
}

export { addPokemon, removeUserPokemon, getUserPokemons }