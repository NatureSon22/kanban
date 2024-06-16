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
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";

const DeleteBoard = ({ board = "Platform Launch" }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <p className="text-red-500">Create New Board</p>
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
            <span className="font-semibold">{board}</span>&quot; board? This
            action will remove all columns and tasks and cannot be reversed.
          </p>
        </div>

        <DialogFooter className="flex gap-3 px-2 sm:justify-stretch">
          <Button className="w-full rounded-full bg-red-500 hover:bg-red-500/80">
            <p className="font-bold">Delete</p>
          </Button>
          <DialogClose asChild>
            <Button
              asChild
              className="w-full rounded-full bg-primary-violet/15 text-primary-violet hover:bg-primary-violet/5"
            >
              <p className="cursor-pointer font-bold">Cancel</p>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoard;
