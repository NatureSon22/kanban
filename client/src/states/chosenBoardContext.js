import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/board/column";

const useChosenBoard = create((set) => ({
  chosenBoard: {},
  columns: [],
  setChosenBoard: (board) => set({ chosenBoard: board }),
  getAllColumns: async (board_id) => {
    try {
      const res = await axios.get(`${API_URL}/${board_id}`);
      set((prev) => {
        const newState = { ...prev, columns: res.data };
        return newState;
      });
    } catch (error) {
      console.log("Error fetching columns:", error.message);
    }
  },
  addColumn: async (board_id, status) => {
    try {
      const res = await axios.post(
        API_URL,
        { board_id, status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const newColumn = res.data;
      set((state) => ({
        columns: [...state.columns, newColumn],
      }));
    } catch (error) {
      console.log(error.message);
    }
  },
  updateColumn: async (id, status) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      set((state) => ({
        columns: state.columns.map((column) =>
          column._id === id ? res.data : column,
        ),
      }));
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteColumn: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        columns: state.columns.filter((column) => column._id !== id),
      }));
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useChosenBoard;
