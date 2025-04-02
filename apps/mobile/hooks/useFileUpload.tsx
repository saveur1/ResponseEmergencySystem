import { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { ImagePickerAsset } from "expo-image-picker";
import * as FileSystem from "expo-file-system";
const s3Client = new S3Client({
  region: process.env.EXPO_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});
export const useS3FileUpload = () => {
  const bucketName = process.env.EXPO_PUBLIC_AWS_S3_BUCKET_NAME!;
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const uploadFileToS3 = async (
    file: ImagePickerAsset,
    folder = "ur-projects"
  ) => {
    try {
      setIsUploading(true);
      // Get file extension
      const extension =
        file.uri.split(".").pop() || file.type?.split("/")[1] || "jpeg";
      const fileKey = `${folder}/${Date.now()}_${Math.floor(
        Math.random() * 10000000
      )}.${extension}`;

      // Read file content as base64
      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Convert base64 to buffer
      const buffer = Buffer.from(fileContent, "base64");

      const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: buffer,
        ContentType: file.mimeType || "image/jpeg",
      };

      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      const s3Url = `https://${bucketName}.s3.${process.env.EXPO_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;
      setIsUploading(false);

      return s3Url;
    } catch (error: any) {
      setErrorMessage(error.message);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  };
  return {
    uploadFileToS3,
    isUploading,
    errorMessage,
  };
};
