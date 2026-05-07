import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "@/stores/useProjectStore";

const CreateProject = () => {
  const { createProject } = useProjectStore();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    await createProject({ name, description });
    setName("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Assignments</Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Assignments</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Assignments name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="w-full bg-rose-500 hover:bg-rose-600"
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
