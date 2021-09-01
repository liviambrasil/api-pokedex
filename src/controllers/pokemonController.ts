import { Request, Response } from "express";
import { addPokemon, getAllPokemons, removeUserPokemon } from "../services/pokemonService";

async function userPokemon (req: Request, res: Response) {
    const pokemonId: number = Number(req.params["id"])

    try{
        await addPokemon(pokemonId)

        res.sendStatus(200)
    }

    catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function removePokemon (req: Request, res: Response) {
    const pokemonId: number = Number(req.params["id"])

    try{
        await removeUserPokemon(pokemonId)

        res.sendStatus(200)
    }

    catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function getPokemons (req: Request, res: Response) {

    try{
        const pokemons = await getAllPokemons()

        res.send(pokemons)
    }
    catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


export {userPokemon, removePokemon, getPokemons}