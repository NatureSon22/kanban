import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useColumnTaskContext from "@/states/columnTaskContext";
import useTaskContext from "@/states/taskContext";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

const DeleteTask = ({ setOpenPopover, setOpenTaskDialog }) => {
  const { task } = useTaskContext();
  const { deleteTask } = useColumnTaskContext();

  const handleDeleteTask = () => {
    deleteTask(task._id);
    setOpenPopover(false);
    setOpenTaskDialog((prev) => !prev);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <p className="cursor-pointer text-red-500">Delete this Task</p>
      </DialogTrigger>

      <DialogContent
        hideCloseButton={true}
        className="grid w-[80%] gap-8 sm:max-w-[470px]"
      >
        <DialogHeader>
          <DialogTitle className="px-2 font-bold text-red-500">
            Delete this task?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div>
          <p className="px-2">
            Are you sure you want to delete the &quot;
            <span className="font-bold">{}</span>&quot; task and its subtasks?
            This action will remove all subtasks and cannot be reversed.
          </p>
        </div>

        <DialogFooter className="flex gap-3 px-2 sm:justify-stretch">
          <DialogClose asChild>
            <Button
              className="w-full rounded-full bg-red-500 hover:bg-red-500/80"
              onClick={handleDeleteTask}
            >
              <p className="font-bold">Delete</p>
            </Button>
          </DialogClose>
          <DialogClose asChild onClick={() => setOpenPopover(false)}>
            <Button className="w-full rounded-full bg-primary-violet/15 text-primary-violet hover:bg-primary-violet/5">
              <p className="cursor-pointer font-bold">Cancel</p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTask;
