import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController"

import axios from 'axios';
import { getRepository } from "typeorm";
import Pokemon from "./entities/Pokemon";
import { verifyToken } from "./middlewares/verifyToken";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signUp);
app.post("/my-pokemons/:id/add", verifyToken, pokemonController.userPokemon);
app.post("/my-pokemons/:id/remove", verifyToken, pokemonController.userPokemon);
app.get("/pokemons", verifyToken, pokemonController.getPokemons)

app.get("/populate", pokemonController.populateDatabase)


export async function init () {
  await connectDatabase();
}

export default app;
