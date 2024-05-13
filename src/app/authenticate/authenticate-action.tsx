"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const users = [
  { name: "John", email: "john.doe@email.com", password: "password123$" },
  { name: "alice", email: "alice.smith@email.com", password: "password123$" },
];

const signInAction = async (formData: { email: string; password: string }) => {
  try {
    revalidatePath("/");
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Unknown Error Found" };
      }
    }
    throw error;
  }
};

const signUpAction = async (formData: {
  name: string;
  email: string;
  password: string;
}) => {
  if (!formData) {
    return { error: "Invalid Credentials" };
  }

  try {
    revalidatePath("/");
    users.push(formData);

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Unknown Error Found" };
      }
    }
    throw error;
  }
};

export { signInAction, signUpAction };
