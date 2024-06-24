import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useChosenBoard from "@/states/chosenBoardContext";

const ComboBox = ({ setCurrentStatus }) => {
  const [open, setOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("");
  const { columns } = useChosenBoard();

  const handleSetCurrentStatus = (column) => {
    setSelectedColumn(column.status);
    setOpen(false);
    setCurrentStatus(column);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-medium"
        >
          {selectedColumn || "Select column"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-md border bg-white p-1 shadow-md sm:w-[25em]">
        {columns.map((column) => (
          <Button
            key={column._id}
            onClick={() => {
              handleSetCurrentStatus(column);
            }}
            className={`w-full rounded-none py-2 hover:bg-primary-violet/10 ${selectedColumn === column.status ? "bg-primary-violet text-white" : "bg-primary-gray/5 text-black"}`}
          >
            {column.status}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
