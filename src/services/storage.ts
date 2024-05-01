export const uploadFile = async (Bucket: R2Bucket, key: string, file: Blob) => {
  try {
    const resp = await Bucket.put(key, file);
    return resp;
  } catch (error) {
    throw { message: `${error}`, code: 500 };
  }
};

export const getFile = async (Bucket: R2Bucket, key: string) => {
  try {
    const resp = await Bucket.get(key);
    return resp?.blob();
  } catch (error) {
    throw { message: `${error}`, code: 500 };
  }
};
