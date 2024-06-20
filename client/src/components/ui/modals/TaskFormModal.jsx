import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { iconAddTask } from "@/utils/imports";

const TaskFormModal = ({ state }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {state === "ADD" ? (
          <button className="absolute bottom-12 right-10 z-10 flex cursor-pointer items-center gap-4 rounded-full bg-primary-violet px-7 py-3 text-white shadow-xl transition-all duration-200 hover:opacity-50">
            <img src={iconAddTask} alt="icon add task" />
            <p className="hidden font-bold md:block">Add New Task</p>
          </button>
        ) : (
          <></>
        )}
      </DialogTrigger>

      <DialogContent className="grid w-[80%] gap-8 sm:max-w-[470px]">
        <DialogHeader>
          <DialogTitle className="px-2 font-bold">
            {state === "ADD" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <div>
          
        </div>

        <DialogFooter className="flex gap-3 px-2 sm:justify-stretch">

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormModal;
