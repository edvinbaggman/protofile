import { S3Client } from '@aws-sdk/client-s3';

const accessKeyId = process.env.AWS_ACCESS_ID as string;
const secretAccessKey = process.env.AWS_SECRET_ID as string;

export const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
