import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
const TaskModal = ({ children, description, subtasks }) => {
  const [subTasks, setSubTasks] = useState(subtasks || []);

  const handleSetTaskCompleted = (id) => {
    setSubTasks((prev) => {
      return prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task,
      );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton={true}
        className="grid w-[80%] gap-5 rounded-md sm:max-w-[400px]"
      >
        <DialogHeader>
          <DialogTitle className="font-bold">
            Design settings and search pages
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary-gray">
            {description}
          </p>
          {subTasks.map((subtask) => {
            return (
              <div className="flex items-center space-x-4" key={subtask._id}>
                <Checkbox
                  className="data-[state=checked]:border-primary-violet data-[state=checked]:bg-primary-violet"
                  id={subtask._id}
                  checked={subtask.completed}
                  onCheckedChange={() => handleSetTaskCompleted(subtask._id)}
                />
                <label
                  htmlFor={subtask._id}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${subtask.completed ? "text-primary-gray line-through" : ""} `}
                >
                  {subtask.title}
                </label>
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default TaskModal;
