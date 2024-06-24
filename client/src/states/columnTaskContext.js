import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/board/column/task";

const useColumnTaskContext = create((set) => ({
  tasks: [],
  addTask: async (column_id, task) => {
    try {
      const res = await axios.post(`${API_URL}/${column_id}`, task, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);

      set((state) => ({ tasks: [...state.tasks, res.data] }));
    } catch (error) {
      console.log(error.message);
    }
  },
  clearTasks: () => set({ tasks: [] }),
}));

export default useColumnTaskContext;
