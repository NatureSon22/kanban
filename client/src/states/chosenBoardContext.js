import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/board/column";

const useChosenBoard = create((set) => ({
  chosenBoard: {},
  setChosenBoard: (board) => set({ chosenBoard: board }),
  getAllColumns: async (board_id) => {
    try {
      const res = await axios.get(`${API_URL}/${board_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      // set((prev) => ({
      //   ...prev,
      //   columns: res.data,
      // }));
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useChosenBoard;
