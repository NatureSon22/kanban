import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Input } from "../input";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { verticalEllipsis } from "@/utils/imports";
import DeleteTask from "./DeleteTaskModal";
import { Button } from "../button";

const TaskModal = ({ children, subtasks, status, description }) => {
  const [subTasks, setSubTasks] = useState(subtasks || []);
  const [completedTasksCount, setCompletedTasksCount] = useState(
    subtasks?.filter((task) => task.completed).length || 0,
  );
  const [openPopover, setOpenPopover] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);

  const handleSetTaskCompleted = (id) => {
    setSubTasks((prev) =>
      prev.map((task) => {
        if (task._id === id) {
          const isCompleted = !task.completed;
          setCompletedTasksCount(
            (prevCount) => prevCount + (isCompleted ? 1 : -1),
          );
          return { ...task, completed: isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton={true}
        className="grid w-[80%] gap-5 rounded-md sm:max-w-[450px]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-3">
            <p className="text-left">Design settings and search pages</p>
            <div>
              <Popover
                open={openPopover}
                onOpenChange={setOpenPopover}
                modal={true}
              >
                <PopoverTrigger className="outline-none">
                  <img src={verticalEllipsis} alt="verticalEllipsis" />
                </PopoverTrigger>
                <PopoverContent className="mr-12 mt-3 grid w-fit gap-2 pl-5 pr-8 text-left shadow-lg">
                  <DeleteTask
                    setOpenPopover={setOpenPopover}
                    setOpenTaskDialog={setOpenTaskDialog}
                  ></DeleteTask>
                </PopoverContent>
              </Popover>
            </div>
          </DialogTitle>
        </DialogHeader>

        <p className="text-primary-gray">{description}</p>

        <div className="space-y-3">
          <p className="text-[0.9rem] font-bold text-primary-gray">
            {`(${completedTasksCount} of ${subTasks.length}) subtasks completed`}
          </p>
          {subTasks.map((subtask) => (
            <div
              className="flex items-center space-x-4 bg-primary-violet/5 p-5"
              key={subtask._id}
            >
              <Checkbox
                className="border-primary-gray/50 data-[state=checked]:border-primary-violet data-[state=checked]:bg-primary-violet"
                id={subtask._id}
                checked={subtask.completed}
                onCheckedChange={() => handleSetTaskCompleted(subtask._id)}
              />
              <label
                htmlFor={subtask._id}
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  subtask.completed ? "text-primary-gray line-through" : ""
                }`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <label className="text-[0.9rem] font-semibold text-primary-gray">
            Current Status
          </label>
          <Input className="pointer-events-none" defaultValue={status}></Input>
        </div>
        <DialogFooter>
          <Button className="mt-2 w-full rounded-s-md bg-primary-violet text-white hover:bg-primary-violet/80">
            <p className="cursor-pointer font-bold">Update</p>
          </Button>
          {/* <DialogClose asChild>
            <Button className="mt-2 w-full rounded-full bg-primary-violet/15 text-primary-violet hover:bg-primary-violet/5">
              <p className="cursor-pointer font-bold">Cancel</p>
            </Button>
          </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
