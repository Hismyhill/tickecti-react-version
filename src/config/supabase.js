import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth helper functions
export const signIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signUp = async ({ email, password, name }) => {
  try {
    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Store name in auth metadata
        },
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No user data returned from signup");

    // Sign in immediately after signup to ensure we have a valid session
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) throw signInError;

    // Create member profile with the authenticated session
    const { data: memberData, error: memberError } = await supabase
      .from("members")
      .insert([
        {
          user_id: authData.user.id,
          full_name: name || email.split("@")[0],
        },
      ])
      .select()
      .single();

    if (memberError) {
      console.error("Member creation error:", memberError);
      throw memberError;
    }

    return {
      ...signInData,
      profile: memberData,
    };
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Tickets helper functions
export const getTickets = async () => {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const getTicketById = async (id) => {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const createTicket = async (ticket) => {
  const { data, error } = await supabase
    .from("tickets")
    .insert([ticket])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateTicket = async (id, updates) => {
  const { data, error } = await supabase
    .from("tickets")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTicket = async (id) => {
  const { error } = await supabase.from("tickets").delete().eq("id", id);
  if (error) throw error;
};

// Member helper functions
export const getMemberProfile = async (userId) => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateMemberProfile = async (memberId, updates) => {
  const { data, error } = await supabase
    .from("members")
    .update(updates)
    .eq("id", memberId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAllMembers = async () => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;
  return data;
};
