import supabase from "@/lib/supabase/client";
import type { User } from "@/lib/types";

export async function createUser(user: User) {
  if (!user.id || !user.name) {
    throw new Error("User ID and name are required to create a user.");
  }
  const { data, error } = await supabase
    .schema("auth")
    .from("users")
    .select()
    .eq("id", user.id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    throw new Error("User already exists.");
  }
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert({
      id: user.id,
      name: user.name,
    });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return newUser;
}
