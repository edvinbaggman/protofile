'use server';
import 'server-only';
import { s3 } from '../lib/aws';
import { IFile } from '@/types';
import { allowedFileTypes } from '@/constants/fileTypes';
import { ObjectId } from 'mongodb';
import { Upload } from '@aws-sdk/lib-storage';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import clientPromise from '@/lib/mongodb';
import mimeTypes from 'mime-types';

async function getCollection(collection: string) {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB_NAME).collection(collection);
}

export async function getAllFiles(): Promise<IFile[]> {
  try {
    const collection = await getCollection('files');
    const results = await collection.find().toArray();
    const files = results.map((file) => ({
      ...file,
      _id: file._id.toString(),
    })) as IFile[];
    return files;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}

export async function deleteFile(id: string, type: string) {
  try {
    // Delete file from MongoDB
    const collection = await getCollection('files');
    await collection.deleteOne({ _id: new ObjectId(id) });

    // Delete file from S3
    const fileKey = `${id}.${mimeTypes.extension(type)}`;
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileKey,
    });
    await s3.send(deleteCommand);
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}

export async function uploadFile(formData: FormData) {
  try {
    // Check File Type
    const file = formData.get('file') as File;
    if (!allowedFileTypes.includes(file.type)) return 'Filetype not supported';

    // Add file to MongoDB and get ID
    const fileObject = {
      name: formData.get('name'),
      uploader: formData.get('uploader'),
      description: formData.get('description'),
      date: new Date().toJSON(),
      type: file.type,
    };
    const collection = await getCollection('files');
    const result = await collection.insertOne(fileObject);
    const id = result.insertedId;

    // Upload file to S3
    const fileKey = `${id}.${mimeTypes.extension(file.type)}`;
    const uploadParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file,
    };
    await new Upload({
      client: s3,
      params: uploadParams,
    }).done();
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
}
