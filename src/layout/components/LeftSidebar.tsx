import { Link } from "react-router-dom";
import { FolderKanban, ClipboardList, ChartColumn, ShieldCheck, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { useUser } from "@clerk/react";
import { useEffect } from "react";
import LoginPromptTaskManager from "./LoginPromptTaskManager";

const LeftSidebar = () => {
  const { isAdmin } = useAuthStore();
  const { isSignedIn, isLoaded } = useUser();
  const { fetchProjects } = useProjectStore();
  const { fetchTasks } = useTaskStore();

  useEffect(() => {
    if (isSignedIn) {
      fetchProjects();
      fetchTasks();
    }
  }, [isSignedIn]);

  if (!isLoaded) return null;

  return (
    <div className="h-full flex flex-col gap-2 overflow-hidden">
      {!isSignedIn && <LoginPromptTaskManager />}

      {isSignedIn && (
        <div className="h-full rounded-lg bg-zinc-900 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
            <Home className="size-5" />
            <h2 className="text-lg font-bold text-white">
              <span>Dashboard</span>
            </h2>
          </div>

          <div className="space-y-6 p-4 h-full overflow-y-auto">
            {/* PROJECTS */}
            <Link
              to={"/projects"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800 hover:text-rose-400",
                }),
              )}
            >
              <FolderKanban className="mr-2 size-5" />
              <span>Assignments</span>
            </Link>

            {/* TASKS */}
            <Link
              to={"/tasks"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800 hover:text-rose-400",
                }),
              )}
            >
              <ClipboardList className="mr-2 size-5" />
              <span>{isAdmin ? "Assign Tasks" : "My Tasks"}</span>
            </Link>

            {/* PROGRESS */}
            <Link
              to={"/progress"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800 hover:text-rose-400",
                }),
              )}
            >
              <ChartColumn className="mr-2 size-5" />
              <span>Progress</span>
            </Link>

            {/* ADMIN PANEL */}
            {isAdmin && (
              <Link
                to={"/admin"}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className:
                      "w-full justify-start text-white hover:bg-zinc-800 hover:text-rose-400",
                  }),
                )}
              >
                <ShieldCheck className="mr-2 size-5" />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
