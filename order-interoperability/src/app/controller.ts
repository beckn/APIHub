import { Request, Response } from "express";
import { s3Client, createUploadParams, client } from "./s3bucket";

import { transform } from "../utils";
export const getS3Url = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.message?.orderId) {
      throw new Error("OrderId is Mandatory");
    }
    const fileContent = await transform(req?.body, "on_confirm");
    const orderId = fileContent?.message?.order?.id;
    const uploadParams = createUploadParams(
      orderId,
      JSON.stringify(fileContent)
    );
    const uploadResponse = await s3Client.send(uploadParams.putObject);
    console.log("Upload Response==>", uploadResponse);
    return res.status(200).json({
      success: true,
      qr_url: `${process.env.BUCKET_BASE_URL}/${uploadParams.fileName}`
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error?.message });
  }
};
