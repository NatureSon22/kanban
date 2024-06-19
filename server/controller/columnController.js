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

export { getAllColumns };
