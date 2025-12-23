import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

function Modal({ open, setOpen, title, description, children }) {
  return (
    <Dialog open={open} onOpenChange={setOpen} className="">
      <DialogContent className="sm:max-w-lg w-full max-h-[90vh] bg-white rounded-xl p-6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
