import { S3Client } from "@aws-sdk/client-s3";
 
const S3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_S3_URL,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY,
    },
});

const sEx = 'example'
 
export { S3, sEx };