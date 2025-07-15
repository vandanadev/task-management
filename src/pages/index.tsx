import React, { useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../store/tasksSlice";
import { AppDispatch } from "../store";
import { Box } from "@mui/material";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Container sx={{ mt: 4 }} maxWidth="md">
      <TaskForm />
      <TaskList />
    </Container>
  );
};

export default Home;
