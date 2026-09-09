"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";

export async function login(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  const validEmail = process.env.ADMIN_EMAIL;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!email || !password || email !== validEmail || password !== validPassword) {
    return { error: "Email ou mot de passe incorrect." };
  }

  await createSession(email);
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/dashboard/login");
}
