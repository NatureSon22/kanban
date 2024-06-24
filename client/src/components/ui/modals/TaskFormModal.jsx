import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { iconAddTask } from "@/utils/imports";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ComboBox from "../../../pages/Main/ComboBox";
import { DialogDescription } from "@radix-ui/react-dialog";
import useColumnTaskContext from "@/states/columnTaskContext";

const TaskFormModal = ({ state }) => {
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [newSubTask, setNewSubTask] = useState("");
  const [subtasks, setSubtask] = useState([]);
  const [currentStatus, setCurrentStatus] = useState({});
  const [openNewTask, setOpenNewTask] = useState(false);
  const { addTask } = useColumnTaskContext();
  const { clearTasks } = useColumnTaskContext();

  const addSubTask = () => {
    const subtask = {
      _id: crypto.randomUUID(),
      title: newSubTask,
    };

    setSubtask((prev) => [...prev, subtask]);
    setNewSubTask("");
    setOpenNewTask((prev) => !prev);
  };

  const handleInput = (id, val) => {
    setSubtask((prev) => {
      return prev.map((subtask) =>
        subtask._id === id ? { ...subtask, title: val } : subtask,
      );
    });
  };

  const handleRemoveSubtask = (task_id) => {
    setSubtask((prev) => prev.filter((subtack) => subtack._id !== task_id));
  };

  const handleAddNewTask = () => {
    if (newSubTask.trim() !== "") {
      addSubTask();
    } else {
      setOpenNewTask((prev) => !prev);
    }
  };

  const handleSaveNewTask = () => {
    const task = {
      task: newTask,
      description,
      subtasks: subtasks.map((subtask) => {
        return { title: subtask.title };
      }),
    };

    addTask(currentStatus._id, task);
    setNewTask("");
    setDescription("");
    setNewSubTask("");
    setSubtask([]);

    clearTasks();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {state === "ADD" && (
          <button className="absolute bottom-12 right-10 z-10 flex cursor-pointer items-center gap-4 rounded-full bg-primary-violet px-7 py-3 text-white shadow-xl transition-all duration-200 hover:opacity-50">
            <img src={iconAddTask} alt="icon add task" />
            <p className="hidden font-bold md:block">Add New Task</p>
          </button>
        )}
      </DialogTrigger>

      <DialogContent
        className="my- grid w-[80%] gap-8 rounded-md sm:max-w-[470px]"
        aria-describedby="dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="px-2 text-left font-bold">
            {state === "ADD" ? "Add New Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div id="dialog-description" className="space-y-3 px-2">
          <div className="space-y-3">
            <Label
              htmlFor="task-name"
              className="text-sm font-semibold text-primary-gray"
            >
              Task Name
            </Label>
            <Input
              id="task-name"
              className="focus-visible:ring-primary-violet"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-3 pb-1">
            <Label
              htmlFor="task-description"
              className="text-sm font-semibold text-primary-gray"
            >
              Description
            </Label>
            <Textarea
              id="task-description"
              className="min-h-24 resize-none focus-visible:ring-primary-violet"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-describedby="task-description"
            ></Textarea>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary-gray">Subtasks</p>
            <div className="max-h-[10em] space-y-3 overflow-y-auto p-2">
              {subtasks.map((subtask) => (
                <div key={subtask._id} className="flex items-center gap-3">
                  <Input
                    value={subtask.title}
                    className="rounded-sm focus-visible:ring-primary-violet"
                    onChange={(e) => handleInput(subtask._id, e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faRemove}
                    className="cursor-pointer text-primary-gray"
                    onClick={() => handleRemoveSubtask(subtask._id)}
                  />
                </div>
              ))}
            </div>
            {openNewTask && (
              <Input
                className="focus-visible:ring-primary-violet"
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                autoFocus
              />
            )}
            <Button
              className="ml-auto flex items-center justify-center gap-2 bg-primary-violet hover:bg-primary-violet/80"
              onClick={handleAddNewTask}
            >
              {newSubTask.length > 0 ? (
                <p className="font-bold">Save Task</p>
              ) : (
                <>
                  <FontAwesomeIcon className="text-sm" icon={faAdd} />
                  <p className="font-bold">Add New Column</p>
                </>
              )}
            </Button>
          </div>

          <div>
            <p className="text-sm font-semibold text-primary-gray">
              Current Status
            </p>
            <ComboBox setCurrentStatus={setCurrentStatus} />
          </div>
        </div>

        <DialogFooter className="px-2 sm:justify-stretch">
          <DialogClose asChild>
            <Button
              className="w-full bg-primary-violet hover:bg-primary-violet/80"
              onClick={state === "ADD" ? handleSaveNewTask : () => {}}
            >
              <p className="font-bold">
                {state === "ADD" ? "Create Task" : "Edit Task"}
              </p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskFormModal;
