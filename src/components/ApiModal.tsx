import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ApiForm } from "./ApiForm";

export function ApiModal({ handleOpen, manageOpen, data }) {
  //edit data call api here
  console.log(data);

  return (
    <Dialog open={handleOpen} onOpenChange={manageOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data ? "EDIT API KEY" : "ADD API KEY"}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ApiForm formData={data} />
      </DialogContent>
    </Dialog>
  );
}
