import { NextApiRequest, NextApiResponse } from "next";

export type Task = {
  id: string;
  name: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
};

let tasks: Task[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      res.status(200).json(tasks);
      break;
    case "POST":
      const newTask: Task = req.body;
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;
    case "PUT":
      const updatedTask: Task = req.body;
      tasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
      res.status(200).json(updatedTask);
      break;
    case "DELETE":
      const { id } = req.body;
      tasks = tasks.filter((t) => t.id !== id);
      res.status(204).end();
      break;
    default:
      res.status(405).end();
  }
}
