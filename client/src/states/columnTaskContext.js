import axios, { getAdapter } from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/board/column/task";

const useColumnTaskContext = create((set) => ({
  tasks: [],
  setTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  addTask: async (column_id, task) => {
    try {
      const res = await axios.post(`${API_URL}/${column_id}`, task, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } catch (error) {
      console.log(error.message);
    }
  },
  updateTask: async (id, column_id, subtasks) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { column_id, subtasks },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? res.data : task)),
      }));
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteTask: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      const { _id } = res.data;
      set((state) => ({
        tasks: state.tasks.filter((task) => _id !== task._id),
      }));
    } catch (error) {
      console.log(error.message);
    }
  },
  clearTasks: () => set({ tasks: [] }),
}));

export default useColumnTaskContext;
