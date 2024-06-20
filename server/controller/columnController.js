import BoardModel from "../model/boardSchema.js";
import ColumnModel from "../model/columnSchema.js";

const getAllColumns = async (req, res) => {
  try {
    const { board_id } = req.params;
    const columns = await ColumnModel.find({ board_id }).sort({ _id: 1 }); // sort by ascending order of _id
    res.status(200).json(columns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getColumnById = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await ColumnModel.findById(id);
    res.status(200).json(column);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addColumn = async (req, res) => {
  try {
    const { board_id, status } = req.body;

    const newColumn = new ColumnModel({
      board_id,
      status,
    });

    await newColumn.save();
    const board = await BoardModel.findById(board_id);
    board.columns.push(newColumn._id);
    await board.save();

    res.status(201).json(newColumn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateColumns = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const column = await ColumnModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.status(200).json(column);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await ColumnModel.findByIdAndDelete(id);

    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }

    res.status(200).json(column);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllColumns, getColumnById, addColumn, updateColumns, deleteColumn };
