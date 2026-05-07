import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useTaskStore } from "@/stores/useTaskStore";
import { useUserStore } from "@/stores/useUserStore";

const EditTask = ({ task }: any) => {
  const { updateTask } = useTaskStore();
  const { users } = useUserStore();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo?._id || "");

  const handleUpdate = async () => {
    await updateTask(task._id, {title, status,assignedTo });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil className="size-4 text-sky-400" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          {/* STATUS */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="todo">todo</SelectItem>
              <SelectItem value="halfway">halfway</SelectItem>
              <SelectItem value="completed">completed</SelectItem>
            </SelectContent>
          </Select>

          {/* ASSIGN USER */}
          <Select value={assignedTo} onValueChange={setAssignedTo}>
            <SelectTrigger>
              <SelectValue placeholder="Assign User" />
            </SelectTrigger>

            <SelectContent>
              {users.map((user: any) => (
                <SelectItem key={user._id} value={user._id}>
                  {user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="w-full bg-rose-500 hover:bg-rose-600"
            onClick={handleUpdate}
          >
            Update Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
