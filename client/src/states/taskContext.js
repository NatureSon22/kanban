import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/board/column/task";

const useTaskContext = create((set) => ({
  task: {},
  setTask: (task) => set({ task }),
  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  },
  updateTask: async (id, column_id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { column_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      set({ task: res.data });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useTaskContext;
