import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, signOut, getCurrentUser } from "../../config/supabase";

// Async thunks
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const { session, user } = await signIn(credentials);
    return { user, session };
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (credentials) => {
    const { session, user } = await signUp(credentials);
    return { user, session };
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  await signOut();
});

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  const user = await getCurrentUser();
  return { user };
});

const loadInitialState = () => {
  try {
    const session = JSON.parse(localStorage.getItem("sb-session"));
    return {
      user: session?.user || null,
      session: session || null,
      status: "idle",
      error: null,
    };
  } catch {
    return {
      user: null,
      session: null,
      status: "idle",
      error: null,
    };
  }
};

const initialState = loadInitialState();

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSession: (state) => {
      state.user = null;
      state.session = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.session = action.payload.session;
        localStorage.setItem(
          "sb-session",
          JSON.stringify(action.payload.session)
        );
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Signup
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.session = action.payload.session;
        localStorage.setItem(
          "sb-session",
          JSON.stringify(action.payload.session)
        );
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Logout
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.session = null;
        state.status = "idle";
        localStorage.removeItem("sb-session");
      })
      // Check Auth
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
      });
  },
});

export const { clearSession } = slice.actions;
export default slice.reducer;
