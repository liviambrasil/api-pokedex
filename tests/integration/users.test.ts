import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUserBody } from "../factories/bodyFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {

  it("returns status 201 for valid params", async () => {
    const body = await createUserBody();

    const response = await supertest(app).post("/sign-up").send({...body, confirmPassword:body.password})
    
    expect(response.status).toEqual(201)
  });
});
