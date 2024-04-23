import { Request, Response } from "express";
import { s3Client, createUploadParams, client } from "./s3bucket";

export const createS3Url = async (req: Request, res: Response) => {
  try {
    if (!req?.body?.id) {
      throw new Error("OrderId is Mandatory");
    }
    const orderId = req.body.id;
    const uploadParams = createUploadParams(orderId, JSON.stringify(req?.body));
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
