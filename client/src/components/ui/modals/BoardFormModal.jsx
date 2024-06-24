import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBoardContext from "@/states/boardContext";
import useChosenBoard from "@/states/chosenBoardContext";
import { useUser } from "@clerk/clerk-react";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

const defaultColumns = [
  {
    _id: crypto.randomUUID(),
    status: "todo",
  },
  {
    _id: crypto.randomUUID(),
    status: "doing",
  },
];

const BoardFormModal = ({ title, columns, state, id, handleClosePopover }) => {
  const { addBoard, updateBoard } = useBoardContext();
  const { addColumn, updateColumn, deleteColumn } = useChosenBoard();
  const { user } = useUser();
  const [boardName, setBoardName] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [boardColumns, setBoardColumns] = useState([]);
  const [openAddColumn, setOpenAddColumn] = useState(false);
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [deleteCol, setDeleteColumn] = useState([]);

  useEffect(() => {
    if (columns?.length > 0) {
      setBoardName(title || "");
      setBoardColumns((prev) =>
        state === "ADD" && prev.length === 0 ? defaultColumns : columns,
      );
    }
  }, [columns, title, state]);

  const handleInput = (val) => {
    setNewColumnName(val);
  };

  const handleBoards = (val, id) => {
    setBoardColumns((prev) =>
      prev.map((prevBoard) =>
        prevBoard._id === id ? { ...prevBoard, status: val } : prevBoard,
      ),
    );
  };

  const handleCreateBoard = () => {
    if (!boardName) {
      setIsEmptyName(() => {
        setTimeout(() => {
          setIsEmptyName(false);
        }, 1000);

        return true;
      });
      return;
    }

    const board = {
      userId: user.id,
      title: boardName
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" "),
      columns: boardColumns.map((column) => ({ status: column.status })),
    };

    addBoard(board);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() !== "") {
      setBoardColumns((prev) => [
        ...prev,
        { _id: crypto.randomUUID(), status: newColumnName },
      ]);
      setNewColumnName("");
      setOpenAddColumn(false);
    } else {
      setOpenAddColumn(!openAddColumn);
    }
  };

  const columnExists = (id) => {
    return columns.find((column) => column._id === id);
  };

  const handleUpdateColumn = async () => {
    try {
      await Promise.all(
        boardColumns.map(async (column) => {
          if (columnExists(column._id)) {
            await updateColumn(column._id, column.status);
          } else {
            await addColumn(id, column.status);
          }
        }),
      );

      if (deleteCol.length > 0) {
        deleteCol.map(async (column) => {
          await deleteColumn(column._id);
        });
        // await Promise.all(
        //   deleteCol.map(async (column) => {
        //     await deleteColumn(column._id);
        //   }),
        // );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveColumn = (id) => {
    if (boardColumns.length === 1) return;
    setBoardColumns((prev) =>
      prev.filter((prevBoard) => {
        if (
          (state === "EDIT" || state === "ADD COLUMN") &&
          prevBoard._id === id
        ) {
          setDeleteColumn((prev) => [...prev, prevBoard]);
        }
        return prevBoard._id !== id;
      }),
    );
  };

  const handleUpdateBoard = () => {
    const newTitle = boardName
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    updateBoard(id, newTitle);

    handleUpdateColumn();
    if (state === "EDIT") handleClosePopover();
    setBoardColumns([]);
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className={
          state === "ADD"
            ? "flex w-full cursor-pointer items-center gap-5 rounded-r-full py-4 pl-8 hover:bg-primary-gray/10 sm:pl-12"
            : "cursor-pointer"
        }
      >
        {state === "ADD" ? (
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faAdd} />
            <p className="font-bold text-primary-violet">Create New Board</p>
          </div>
        ) : state === "EDIT" ? (
          <div>
            <p className="text-primary-gray">Edit Board</p>
          </div>
        ) : (
          <div className="mt-9 grid min-w-[290px] cursor-pointer place-items-center rounded-md bg-primary-gray/10">
            <div className="flex items-center gap-3 text-primary-gray">
              <FontAwesomeIcon icon={faAdd} className="font-bold" />
              <p className="text-[1.3rem] font-bold">New Column</p>
            </div>
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="grid w-[80%] gap-10 rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">
            {state === "ADD" ? "Add New Board" : "Edit Board"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid gap-4">
            <Label
              htmlFor="board-name"
              className="font-semibold text-primary-gray"
            >
              Board Name
            </Label>
            <Input
              id="board-name"
              className={`rounded-sm ${
                isEmptyName
                  ? "italic text-red-500 ring-1 ring-red-500"
                  : "focus-visible:ring-primary-violet"
              } `}
              value={isEmptyName ? "Cannot be empty" : boardName}
              onChange={(e) => setBoardName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary-gray">
              Board Columns
            </p>

            <div className="space-y-3 overflow-auto p-1">
              {boardColumns?.map((column) => (
                <div key={column._id} className="flex items-center gap-3">
                  <Input
                    value={column.status}
                    className="rounded-sm focus-visible:ring-primary-violet"
                    onChange={(e) => handleBoards(e.target.value, column._id)}
                  />
                  <FontAwesomeIcon
                    icon={faRemove}
                    className="cursor-pointer text-primary-gray"
                    onClick={() => handleRemoveColumn(column._id)}
                  />
                </div>
              ))}
              {openAddColumn && (
                <div>
                  <Input
                    className="rounded-sm focus-visible:ring-primary-violet"
                    value={newColumnName}
                    onChange={(e) => handleInput(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>

            <Button
              className="ml-auto flex items-center justify-center gap-2 bg-primary-violet hover:bg-primary-violet/80"
              onClick={handleAddColumn}
            >
              {newColumnName.length > 0 ? (
                <p className="font-bold">Save Column</p>
              ) : (
                <>
                  <FontAwesomeIcon className="text-sm" icon={faAdd} />
                  <p className="font-bold">Add New Column</p>
                </>
              )}
            </Button>
          </div>
        </div>

        <DialogFooter className="px-2 sm:justify-stretch">
          <DialogClose asChild>
            <Button
              className="w-full bg-primary-violet hover:bg-primary-violet/80"
              onClick={state === "ADD" ? handleCreateBoard : handleUpdateBoard}
            >
              <p className="font-bold">
                {state === "ADD" ? "Create New Board" : "Save Changes"}
              </p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoardFormModal;
