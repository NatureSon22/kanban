import BoardModel from "../model/boardSchema.js";
import ColumnModel from "../model/columnSchema.js";

const getAllBoards = async (req, res) => {
  try {
    const { userId } = req.params;
    const boards = await BoardModel.find({ user_id: userId });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBoardById = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await BoardModel.findById(id);
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBoard = async (req, res) => {
  try {
    const { userId, title, columns } = req.body;
    // Create board first
    const board = await BoardModel({ user_id: userId, title });
    await board.save();

    // Create columns
    const columnsDocs = await Promise.all(
      columns.map(async (column) => {
        const newColumn = new ColumnModel({
          board_id: board._id,
          status: column.status,
        });
        await newColumn.save();
        return newColumn._id;
      })
    );

    board.columns = columnsDocs;
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const board = await BoardModel.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await BoardModel.findByIdAndDelete(id);
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addColumn = async (req, res) => {
  try {
    const { boardId, status } = req.body;

    const newColumn = new ColumnModel({
      board_id: boardId,
      status,
    });

    await newColumn.save();

    const board = await BoardModel.findById(boardId);
    board.columns.push(newColumn._id);
    await board.save();

    res.status(201).json(newColumn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
