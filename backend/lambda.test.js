import { test, expect, describe } from "@jest/globals";
import deleteUser from "./models/delete.js";
import login from "./models/login.js";
import register from "./models/register.js";

describe("Testing the Register functionality", () => {
  test("Trying to add a new valid user to the table", async () => {
    //arrange
    const expected = 200;

    //act
    const result = await register({
      username: "TestUser3475478",
      password: "password",
      firstname: "Ala",
      surename: "Dar",
      email: "ala@dar.com",
    });

    const actual = result.statusCode;

    //assert
    expect(actual).toBe(expected);
  });

  test("Trying to add an existing user to the table", async () => {
    //arrange
    const expected = '{"message":"Username is already taken"}';

    //act
    const result = await register({
      username: "TestUser3475478",
      password: "password",
      firstname: "Ala",
      surename: "Dar",
      email: "ala@dar.com",
    });

    const actual = result.body;

    //assert
    expect(actual).toBe(expected);
  });

  test("Trying to add a user to the table with missing details", async () => {
    //arrange
    const expected = '{"message":"Please complete every fields"}';

    //act
    const result = await register({
      username: "TestUser3475478",
      password: "password",
      surename: "Dar",
      email: "ala@dar.com",
    });

    const actual = result.body;

    //assert
    expect(actual).toBe(expected);
  });
});

describe("Testing the Login functionality", () => {
  test("Trying to log in with correct credentials", async () => {
    //arrange
    const expected = 200;

    //act
    const result = await login({
      username: "TestUser3475478",
      password: "password",
    });

    const actual = result.statusCode;

    //assert
    expect(actual).toBe(expected);
  });

  test("Trying to log in with incorrect credentials", async () => {
    //arrange
    const expected = 404;

    //act
    const result = await login({
      username: "TestUser3475478",
      password: "passworwd",
    });

    const actual = result.statusCode;

    //assert
    expect(actual).toBe(expected);
  });

  test("Trying to log in with missing credentials", async () => {
    //arrange
    const expected = 401;

    //act
    const result = await login({
      username: "TestUser3475478",
    });

    const actual = result.statusCode;

    //assert
    expect(actual).toBe(expected);
  });
});
describe("Testing the Delete functionality", () => {
  test("Trying to delete the test user", async () => {
    //arrange
    const expected = 200;

    //act
    const result = await deleteUser("TestUser3475478");

    const actual = result.statusCode;

    //assert
    expect(actual).toBe(expected);
  });
});
