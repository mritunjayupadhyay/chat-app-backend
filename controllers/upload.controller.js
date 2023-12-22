import { S3 } from '../lib/s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

const slugifyString = (str) => {
    return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-').replace(/[^a-z0-9-.]/g, '-');
}
 
const getSignedUrlFunc = asyncHandler(async (req, res) => {
  
    const { fileName, fileType } = req.body;    
 
    if (!fileName || !fileType || fileName.trim() === '' || fileType.trim() === '') {
        throw new ApiError(404, "file name or key is required");
    }
    const objectKey = `${slugifyString(Date.now().toString())}-${slugifyString(fileName)}`;


    const presignedUrl = await getSignedUrl(S3, new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: objectKey, 
        ContentType: fileType,
        ACL: 'public-read'
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