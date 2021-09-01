import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController"

import { verifyToken } from "./middlewares/verifyToken";
import { populateDatabase } from "../populateDatabase";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp); //funcionando
app.post("/sign-in", userController.signIn); //funcionando
app.post("/my-pokemons/:id/add", verifyToken, pokemonController.userPokemon); //funcionando
app.post("/my-pokemons/:id/remove", verifyToken, pokemonController.removePokemon); //funcionando
app.get("/pokemons", verifyToken, pokemonController.getPokemons) //funcionando

app.get("/populate", populateDatabase)


export async function init () {
  await connectDatabase();
}

export default app;
