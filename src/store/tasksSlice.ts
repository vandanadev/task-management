// src/store/tasksSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type Task = {
  id: string;
  name: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const res = await axios.get("/api/tasks");
  return res.data;
});

export const addTaskAsync = createAsyncThunk(
  "tasks/addTask",
  async (task: Task) => {
    const res = await axios.post("/api/tasks", task);
    return res.data;
  }
);

export const editTaskAsync = createAsyncThunk(
  "tasks/editTask",
  async (task: Task) => {
    const res = await axios.put("/api/tasks", task);
    return res.data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await axios.delete("/api/tasks", { data: { id } });
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(
        editTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
          if (idx !== -1) state.tasks[idx] = action.payload;
        }
      )
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        }
      );
  },
});

export const tasksReducer = tasksSlice.reducer;
