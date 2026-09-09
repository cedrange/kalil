import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export async function saveUploadedFiles(files, subfolder) {
  const validFiles = files.filter((f) => f && typeof f === "object" && f.size > 0);
  if (validFiles.length === 0) return [];

  const dir = path.join(process.cwd(), "public", "uploads", subfolder);
  await mkdir(dir, { recursive: true });

  const urls = [];
  for (const file of validFiles) {
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${randomUUID()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), buffer);
    urls.push(`/uploads/${subfolder}/${filename}`);
  }
  return urls;
}
