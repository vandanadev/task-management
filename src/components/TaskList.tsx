import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteTaskAsync } from "../store/tasksSlice";
import { AppDispatch } from "../store";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskForm from "./TaskForm";
import { Task } from "../store/tasksSlice";
import TextField from "../ui/components/TextField";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Select from "../ui/components/Select";
import CircularProgress from "../ui/components/CircularProgress";
import Snackbar from "../ui/components/Snackbar";
import Button from "../ui/components/Button";
import Dialog from "../ui/components/Dialog";

const priorities = ["All", "Low", "Medium", "High"];

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [date, setDate] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "info" | "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filteredTasks = tasks
    .filter((task) => {
      const searchText = search.trim().toLowerCase();
      if (!searchText) return true;
      return (
        (task.name && task.name.toLowerCase().includes(searchText)) ||
        (task.description &&
          task.description.toLowerCase().includes(searchText))
      );
    })
    .filter((task) => {
      const matchesPriority = priority === "All" || task.priority === priority;
      const matchesDate = !date || task.dueDate === date;
      return matchesPriority && matchesDate;
    });

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setEditTask(null);
    setOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDelete({ open: true, id });
  };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    if (confirmDelete.id) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 700));
        await dispatch(deleteTaskAsync(confirmDelete.id!));
        setSnackbar({
          open: true,
          message: "Task deleted",
          severity: "success",
        });
      } catch {
        setSnackbar({
          open: true,
          message: "Error deleting task",
          severity: "error",
        });
      }
      setDeleteLoading(false);
      setConfirmDelete({ open: false, id: null });
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ open: false, id: null });
  };

  return (
    <Box>
     <Box boxShadow={2} p={4} borderRadius={1} mb={4} bgcolor={'#fff'}>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        Task List
      </Typography>
      <TextField
        label="Search by Name/Description"
        value={search}
        color="info"
               sx={{ background:'transparent',}}
        onChange={(e) => setSearch(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" gap={2} mb={2}>
          <Select
            label="Priority"
            color="info"
            sx={{ background:'transparent',}}
            value={priority}
            options={priorities}
            onChange={(e) => setPriority(e.target.value as string)}
          />
          <DatePicker
            label="Due Date"
            format="YYYY-MM-DD"
            value={date ? dayjs(date) : null}
            onChange={(newDate) => setDate(newDate ? newDate.format('YYYY-MM-DD') : '')}
            open={datePickerOpen}
            onOpen={() => setDatePickerOpen(true)}
            onClose={() => setDatePickerOpen(false)}
            slotProps={{
              textField: {
                color: 'info',
                sx: { background: 'transparent', width: '100%', mt: 2 },
                InputLabelProps: { shrink: true },
                onClick: () => setDatePickerOpen(true),
              },
            }}
          />
        </Box>
      </LocalizationProvider>

      <List  sx={{ width: '100%', display: 'flex', flexDirection: 'column', p:1 , gap: 2 }}>
        {filteredTasks.map((task) => (
          <ListItem
            sx={{  background: '#ebf5ff',border: '1px solid #1976d180', boxShadow: 'none', borderRadius: 1 , mb: 0 }}
            key={task.id}   
            secondaryAction={
              <Box display="flex" gap={2}>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(task)}
                >
                  <EditIcon  color="primary" fontSize="medium" />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  <DeleteIcon color="error" fontSize="medium" />
                </IconButton >
              </Box>  
            }
          >
            <ListItemText
              primary={task.name}
               sx={{ color: '#333', fontWeight: 'bold' }} 
              secondary={`Priority: ${task.priority} | Due: ${task.dueDate}`}
            />
          </ListItem>
        ))}
      </List>
      </Box>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <DialogContent>
          {editTask && <TaskForm editTask={editTask} onClose={handleClose} />}
        </DialogContent>
      </Dialog>
      <Dialog
        open={confirmDelete.open}
        onClose={handleCancelDelete}
        title="Confirm Delete"
        actions={
          <>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress /> : "Delete"}
            </Button>
          </>
        }
      >
        Are you sure you want to delete this task?
      </Dialog>
      <Snackbar
        open={snackbar.open}
        onClose={() =>
          setSnackbar({ open: false, message: "", severity: "info" })
        }
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default TaskList;
