import { BUCKET_NAME, GET_UPLOAD_URL } from "./constants";
import axios from "axios";

export enum ImageKind {
  THUMBNAIL,
  FULL_SIZE
}

export const getImageUrl = (kind: ImageKind, key: string) => {
  const kindMap = {
    [ImageKind.THUMBNAIL]: "thumbnail",
    [ImageKind.FULL_SIZE]: "full-size",
  }

  return `https://${BUCKET_NAME}.s3-ap-southeast-2.amazonaws.com/${kindMap[kind]}/${key}`;
}

export const getUploadUrl = async () => {
  const { data } = await axios.get(GET_UPLOAD_URL);
  console.log(data);

  return data;
}