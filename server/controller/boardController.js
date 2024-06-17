import BoardModel from "../model/boardSchema.js";
import ColumnModel from "../model/columnSchema.js";

const getAllBoards = async (req, res) => {
  try {
    const boards = await BoardModel.find();
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
    const { title, columns } = req.body; // the columns will be [ { board_id, status, tasks (which will be empty initially) } ]

    //Create board first
    const board = await BoardModel({ title });
    board.save();

    //Create columns
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

export { createBoard, getAllBoards, getBoardById };
