import { Hono } from "hono";

const example = new Hono<{ Bindings: Api.Bindings }>();

example.get("/", async (c) => {
  const response: Api.Response = {
    status: 1,
    result: "hola",
  };
  return c.json(response);
});

export default example;
