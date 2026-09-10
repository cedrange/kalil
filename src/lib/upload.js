import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";

export async function saveUploadedFiles(files, subfolder) {
  const validFiles = files.filter((f) => f && typeof f === "object" && f.size > 0);
  if (validFiles.length === 0) return [];

  const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  const urls = [];

  for (const file of validFiles) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${randomUUID()}${ext}`;

    if (useBlob) {
      const blob = await put(`${subfolder}/${filename}`, file, {
        access: "public",
        addRandomSuffix: false,
      });
      urls.push(blob.url);
    } else {
      const dir = path.join(process.cwd(), "public", "uploads", subfolder);
      await mkdir(dir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(dir, filename), buffer);
      urls.push(`/uploads/${subfolder}/${filename}`);
    }
  }
  return urls;
}

