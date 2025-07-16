import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTaskAsync, editTaskAsync, Task } from "../store/tasksSlice";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TextField from "../ui/components/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "../ui/components/Button";
import Select from "../ui/components/Select";
import CircularProgress from "../ui/components/CircularProgress";
import Snackbar from "../ui/components/Snackbar";
import { AppDispatch } from "../store";

const priorities = ["Low", "Medium", "High"];

type TaskFormInputs = {
  name: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

interface Props {
  editTask?: Task;
  onClose?: () => void;
}

const TaskForm: React.FC<Props> = ({ editTask, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "info" | "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInputs>({
    defaultValues: editTask || {
      name: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    },
  });
  const onSubmit = async (data: TaskFormInputs) => {
    setLoading(true);
    try {
      if (editTask) {
        await new Promise((resolve) => setTimeout(resolve, 700));
        await dispatch(editTaskAsync({ ...editTask, ...data }));
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Task updated",
          severity: "success",
        });
        setTimeout(() => {
          if (onClose) onClose(); // Close dialog after snackbar is visible
        }, 700);
        setTimeout(() => {
          setSnackbar({ open: false, message: "", severity: "info" });
        }, 2000);
      } else {
        const newTask: Task = {
          id: uuidv4(),
          ...data,
        };
        await new Promise((resolve) => setTimeout(resolve, 700));
        await dispatch(addTaskAsync(newTask));
        setSnackbar({ open: true, message: "Task added", severity: "success" });
        setLoading(false);
        setTimeout(
          () => setSnackbar({ open: false, message: "", severity: "info" }),
          2000
        );
        reset();
      }
    } catch {
      setSnackbar({
        open: true,
        message: "Error saving task",
        severity: "error",
      });
      setLoading(false);
      setTimeout(
        () => setSnackbar({ open: false, message: "", severity: "info" }),
        2000
      );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          boxShadow: editTask ? 0 : 2,
          p: editTask ? 0 : 4,
          borderRadius: editTask ? 0 : 1,
          mb: 4,
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          {editTask ? "Edit Task" : "Add New Task"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Task name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{
                  background: "transparent",
                  borderRadius: 0,
                  boxShadow: "none",
                }}
                label="Task Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                color="info"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{
                  background: "transparent",
                  borderRadius: 0,
                  boxShadow: "none",
                }}
                label="Description"
                color="info"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Priority is required" }}
            render={({ field }) => (
              <Select
                {...field}
                label="Priority"
                options={priorities}
                error={!!errors.priority}
                color="info"
                sx={{ background: "transparent" }}
              />
            )}
          />
          <Controller
            name="dueDate"
            control={control}
            rules={{ required: "Due date is required" }}
            render={({ field }) => (
              <DatePicker
                label="Due Date"
                format="YYYY-MM-DD"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date: dayjs.Dayjs | null) =>
                  field.onChange(date ? date.format("YYYY-MM-DD") : "")
                }
                minDate={dayjs().startOf("day")}
                open={datePickerOpen}
                onOpen={() => setDatePickerOpen(true)}
                onClose={() => setDatePickerOpen(false)}
                slotProps={{
                  textField: {
                    error: !!errors.dueDate,
                    helperText: errors.dueDate?.message,
                    color: "info",
                    sx: {
                      background: "transparent",
                      borderRadius: 0,
                      boxShadow: "none",
                      width: "100%",
                      mt: 2,
                    },
                    InputLabelProps: { shrink: true },
                    onClick: () => setDatePickerOpen(true),
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress />
            ) : editTask ? (
              "Save Changes"
            ) : (
              "Add Task"
            )}
          </Button>
        </form>
        <Snackbar
          open={snackbar.open}
          onClose={() =>
            setSnackbar({ open: false, message: "", severity: "info" })
          }
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default TaskForm;
