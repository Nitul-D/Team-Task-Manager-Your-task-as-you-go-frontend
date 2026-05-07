import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Trash2 } from "lucide-react";
import { useTaskStore } from "@/stores/useTaskStore";
import CreateTask from "@/components/CreateTask";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import EditTask from "@/components/EditTask";

const TasksPage = () => {
  const { tasks, deleteTask } = useTaskStore();
  const { isAdmin } = useAuthStore();

  return (
    <PageLayout>
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Tasks</h1>
            <p className="text-zinc-400 mt-2">
              {isAdmin
                ? "Manage all assigned tasks"
                : "Admin has assigned you tasks"}
            </p>
          </div>
          {isAdmin && <CreateTask />}
        </div>

        <div className="space-y-5">
          {tasks.map((task) => (
            <Card key={task._id} className=" bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <ClipboardList className="size-10 text-sky-400" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {task.title}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">
                      Project: {task.projectId?.name}
                    </p>
                    <p className="text-zinc-500 text-xs mt-2">
                      Assigned To: {task.assignedTo?.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm
                    ${
                      task.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : task.status === "halfway"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {task.status}
                  </span>

                  <EditTask task={task} />

                  {isAdmin && (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteTask(task._id)}
                      >
                        <Trash2 className="size-4 text-red-400" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default TasksPage;
