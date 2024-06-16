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
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const defaultColumns = [
  {
    id: crypto.randomUUID(),
    title: "todo",
  },
  {
    id: crypto.randomUUID(),
    title: "doing",
  },
  {
    id: crypto.randomUUID(),
    title: "done",
  },
];

const CreateBoard = ({ columns }) => {
  const [boardColumns, setboardColumns] = useState(columns || defaultColumns);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="flex w-full cursor-pointer items-center gap-5 rounded-r-full py-4 pl-8 hover:bg-primary-gray/10 sm:pl-12"
      >
        <div>
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
          <div>
            <p className="font-bold text-primary-violet">Create New Board</p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="grid w-[80%] gap-10 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold">Add New Board</DialogTitle>
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
              className="rounded-sm focus-visible:ring-primary-violet"
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary-gray">
              Board Columns
            </p>

            <div className="space-y-2">
              {boardColumns.map((column) => (
                <div key={column.id} className="flex items-center gap-3">
                  <Input
                    value={column.title}
                    className="rounded-sm focus-visible:ring-primary-violet"
                  />
                  <FontAwesomeIcon
                    icon={faRemove}
                    className="cursor-pointer text-primary-gray"
                  />
                </div>
              ))}
            </div>

            <Button className="ml-auto flex items-center justify-center gap-2 bg-primary-violet hover:bg-primary-violet/80">
              <FontAwesomeIcon
                className="text-sm"
                icon={faAdd}
              ></FontAwesomeIcon>
              <p className="font-bold">Add New Column</p>
            </Button>
          </div>
        </div>

        <DialogFooter className="px-2 sm:justify-stretch">
          <Button className="w-full bg-primary-violet hover:bg-primary-violet/80">
            <p className="font-bold">Create New Board</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoard;
