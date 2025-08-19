import supabase from "@/lib/supabase/client";
import type { User } from "@/lib/types";

export async function createUser(user: User) {
  const { data, error } = await supabase.from("users").insert({
    id: user.id,
    name: user.name,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
