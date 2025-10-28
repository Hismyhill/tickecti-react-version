import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../../config/supabase";

// Async thunks
export const fetchTickets = createAsyncThunk(
  "tickets/fetch",
  async (_, thunkAPI) => {
    try {
      const data = await getTickets();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to load tickets. Please retry."
      );
    }
  }
);

export const createTicketAsync = createAsyncThunk(
  "tickets/create",
  async (payload, thunkAPI) => {
    try {
      const created = await createTicket(payload);
      return created;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to create ticket."
      );
    }
  }
);

export const updateTicketAsync = createAsyncThunk(
  "tickets/update",
  async ({ id, payload }, thunkAPI) => {
    try {
      const updated = await updateTicket(id, payload);
      return updated;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to update ticket."
      );
    }
  }
);

export const deleteTicketAsync = createAsyncThunk(
  "tickets/delete",
  async (id, thunkAPI) => {
    try {
      await deleteTicket(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Failed to delete ticket."
      );
    }
  }
);

const slice = createSlice({
  name: "tickets",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    addTicket(state, action) {
      state.items.unshift(action.payload);
    },
    updateTicketLocal(state, action) {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    removeTicketLocal(state, action) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchTickets.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchTickets.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(createTicketAsync.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      })
      .addCase(updateTicketAsync.fulfilled, (s, a) => {
        const idx = s.items.findIndex((t) => t.id === a.payload.id);
        if (idx !== -1) s.items[idx] = a.payload;
      })
      .addCase(deleteTicketAsync.fulfilled, (s, a) => {
        s.items = s.items.filter((t) => t.id !== a.payload);
      });
  },
});

export const { addTicket, updateTicketLocal, removeTicketLocal } =
  slice.actions;
export default slice.reducer;
