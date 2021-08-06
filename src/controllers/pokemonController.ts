import axios from "axios";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import { addPokemon, getUserPokemons, removeUserPokemon } from "../services/pokemonService";

async function userPokemon (req: Request, res: Response) {
    const {user} = res.locals
    const pokemonId = req.headers["id"]

    try{
        await addPokemon(user.id, +pokemonId)

        res.sendStatus(200)
    }

    catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function removePokemon (req: Request, res: Response) {
    const {user} = res.locals
    const pokemonId = req.headers["id"]

    try{
        await removeUserPokemon(user.id, +pokemonId)

        res.sendStatus(200)
    }

    catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function getPokemons (req: Request, res: Response) {
    const {user} = res.locals

    try{
        const userPokemons = getUserPokemons(user.id)

        return userPokemons
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

async function populateDatabase (req: Request, res: Response) {
        console.log("Entrou")
        for(let i = 1; i <= 898; i ++){
          const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          const newPokemon = {
            name: result.data.name,
            number: result.data.id,
            image: result.data.sprites.front_default,
            weight: result.data.weight,
            height: result.data.height,
            baseExp: result.data.base_experience,
            description: ""
          }
          const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
          for (let j = 0; j < speciesResult.data.flavor_text_entries.length; j++) {
            if(speciesResult.data.flavor_text_entries[j].language.name === "en"){
              newPokemon.description =  speciesResult.data.flavor_text_entries[j].flavor_text.split("\n").join(" ")
            }
          }
          await getRepository(Pokemon).insert(newPokemon);
        }
        res.send("OK");
}

export {userPokemon, removePokemon, getPokemons, populateDatabase}