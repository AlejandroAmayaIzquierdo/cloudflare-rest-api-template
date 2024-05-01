import { Hono } from "hono";
import {
  getFileController,
  uploadFileController,
} from "../controllers/storageController";
import { StatusCode } from "hono/utils/http-status";
import { stream } from "hono/streaming";

const storage = new Hono<{ Bindings: Api.Bindings }>();

storage.get("/:key", async (c) => {
  const file = await getFileController(c);
  const sFile = file?.stream();
  return stream(c, async (stream) => {
    stream.onAbort(() => {
      console.log("Aborted!");
    });
    if (sFile) await stream.pipe(sFile);
  });
});

storage.post("/upload/:key", async (c) => {
  try {
    const uploadFile = await uploadFileController(c);
    const response: Api.Response = {
      status: 1,
      result: uploadFile,
    };
    c.status(202);
    return c.json(response);
  } catch (err) {
    const error = err as Api.Error;
    c.status((error.code as StatusCode) ?? 500);
    return c.json(error);
  }
});

export default storage;
