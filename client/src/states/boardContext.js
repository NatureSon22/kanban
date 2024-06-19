import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3000";

const useBoardContext = create((set) => ({
  boards: [],
  addBoard: async (board) => {
    try {
      const res = await axios.post(`${API_URL}/board`, board, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      set((state) => ({ boards: [...state.boards, res.data] }));
    } catch (error) {
      console.log(error.message);
    }
  },
  getAllBoards: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/board/userId=${userId}`);
      set(() => ({ boards: res.data }));
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useBoardContext;
