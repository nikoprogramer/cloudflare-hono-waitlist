import { it, expect, mock, beforeEach } from "bun:test";
import { insertSubscriber } from "./queries";
import { D1Database } from "@cloudflare/workers-types";
import type { NewSubscriber } from "./schema";
import { getTestDb } from "../../../test/get-test-db";

mock.module("./db.ts", () => {
  return {
    getDb: () => getTestDb(),
  };
});

it("insert a new subsciber into the database", async () => {
  const newSub = { email: "test@test.com" } as NewSubscriber;
  const subsciber = await insertSubscriber({} as D1Database, newSub);
  expect(subsciber.email).toBe(newSub.email);
  expect(subsciber.id).toBeDefined();
  expect(subsciber.createdAt).toBeDefined();
});

it("throws an error when inserting a duplicate email", async () => {
  const newSub = { email: "test@test.com" } as NewSubscriber;
  await insertSubscriber({} as D1Database, newSub);
  expect(await insertSubscriber({} as D1Database, newSub)).rejects.toThrow();
});
