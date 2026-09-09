"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(prevState, formData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const phone = formData.get("phone")?.toString().trim() || null;
  const country = formData.get("country")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();
  const propertyIdRaw = formData.get("propertyId")?.toString();
  const propertyId = propertyIdRaw ? Number(propertyIdRaw) : null;

  if (!name || !email || !message) {
    return { ok: false, error: "Merci de remplir votre nom, votre email et votre message." };
  }

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone,
      country,
      message,
      propertyId: propertyId || undefined,
    },
  });

  return { ok: true, error: null };
}

export async function updateContactStatus(id, status) {
  const session = await getSession();
  if (!session) throw new Error("Non autorisé");

  await prisma.contactMessage.update({ where: { id }, data: { status } });
  revalidatePath("/dashboard/contacts");
}

export async function deleteContactMessage(id) {
  const session = await getSession();
  if (!session) throw new Error("Non autorisé");

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/dashboard/contacts");
}
