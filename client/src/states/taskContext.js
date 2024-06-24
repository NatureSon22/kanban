import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/board/column/task";

const useTaskContext = create((set) => ({
  task: {},
  setTask: (task) => set({ task }),
}));

export default useTaskContext;
