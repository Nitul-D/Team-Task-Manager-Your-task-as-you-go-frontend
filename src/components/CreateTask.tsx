import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaskStore } from "@/stores/useTaskStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useUserStore } from "@/stores/useUserStore";

const CreateTask = () => {
  const { createTask } = useTaskStore();
  const { projects } = useProjectStore();
  const { users } = useUserStore();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleCreate = async () => {
    await createTask({ title, projectId, assignedTo, status: "todo" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Task</Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* PROJECT */}
          <Select onValueChange={setProjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Assignments" />
            </SelectTrigger>

            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* USER */}
          <Select onValueChange={setAssignedTo}>
            <SelectTrigger>
              <SelectValue placeholder="Assign User" />
            </SelectTrigger>

            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user._id} value={user._id}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="w-full bg-rose-500 hover:bg-rose-600"
            onClick={handleCreate}
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
