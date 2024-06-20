import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useBoardContext from "@/states/boardContext";
import useChosenBoard from "@/states/chosenBoardContext";
import { DialogClose } from "@radix-ui/react-dialog";

const DeleteBoard = ({ id, handleClosePopover }) => {
  const { deleteBoard } = useBoardContext();
  const { chosenBoard } = useChosenBoard();

  const handleDeleteBoard = () => {
    deleteBoard(id);
    handleClosePopover();
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <p className="text-red-500">Delete this Board</p>
      </DialogTrigger>

      <DialogContent className="grid w-[80%] gap-8 sm:max-w-[470px]">
        <DialogHeader>
          <DialogTitle className="px-2 font-bold text-red-500">
            Delete this board?
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="px-2">
            Are you sure you want to delete the &quot;
            <span className="font-bold">{chosenBoard.title}</span>&quot; board?
            This action will remove all columns and tasks and cannot be
            reversed.
          </p>
        </div>

        <DialogFooter className="flex gap-3 px-2 sm:justify-stretch">
          <DialogClose asChild>
            <Button
              className="w-full rounded-full bg-red-500 hover:bg-red-500/80"
              onClick={handleDeleteBoard}
            >
              <p className="font-bold">Delete</p>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-full rounded-full bg-primary-violet/15 text-primary-violet hover:bg-primary-violet/5">
              <p className="cursor-pointer font-bold">Cancel</p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoard;
