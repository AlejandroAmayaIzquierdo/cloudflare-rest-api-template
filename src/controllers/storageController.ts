import { Context } from "hono";
import { BlankInput } from "hono/types";
import { getFile, uploadFile } from "../services/storage";

export const uploadFileController = async (
  c: Context<
    {
      Bindings: Api.Bindings;
    },
    "/upload/:key",
    BlankInput
  >
) => {
  try {
    const key = c.req.param("key");

    if (!key) throw { message: "Key required to upload file", code: 404 };
    const file = await c.req.blob();

    const uFile = await uploadFile(c.env.MY_BUCKET, key, file);

    console.log("Ufile", uFile);

    return uFile;
  } catch (err) {
    const error = err as Api.Error;
    throw { message: error.message, code: error.code };
  }
};

export const getFileController = async (
  c: Context<
    {
      Bindings: Api.Bindings;
    },
    "/:key",
    BlankInput
  >
) => {
  try {
    const key = c.req.param("key");

    if (!key) throw { message: "Key required to download file", code: 404 };

    const file = await getFile(c.env.MY_BUCKET, key);

    return file;
  } catch (err) {
    const error = err as Api.Error;
    throw { message: error.message, code: error.code };
  }
};
