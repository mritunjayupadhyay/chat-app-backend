import { S3 } from '../lib/s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { v4 as uuidv4 } from 'uuid';

 
const getSignedUrlFunc = asyncHandler(async (req, res) => {
  
    const { key } = req.body;    
 
    if (!key) {
        throw new ApiError(404, "file name or key is required");
    }
    const uuidKey = uuidv4();
    const objectKey = `${key}/${uuidKey}.png`;


    const presignedUrl = await getSignedUrl(S3, new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: objectKey, 
    }), {
        expiresIn: 60 * 5 // 5 minutes
    });

    return res
    .status(200)
    .json(
      new ApiResponse(200, {presignedUrl, objectKey})
    );
});

export { getSignedUrlFunc };