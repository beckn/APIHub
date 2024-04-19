import { S3Client, PutObjectCommand, S3 } from "@aws-sdk/client-s3";

import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
export const client = new S3({
  region: process.env.S3_Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_KEY_SECRET as string
  }
});

export const s3Client = new S3Client({
  region: process.env.S3_Region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_KEY_SECRET as string
  }
});

export const createUploadParams = (
  fileName: string,
  body: any
): { putObject: PutObjectCommand; fileName: string } => {
  const key = `${fileName}_${uuidv4()}.json`;
  const putObject = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: body
  });
  return { putObject, fileName: key };
};
