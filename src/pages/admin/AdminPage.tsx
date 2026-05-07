import { ShieldCheck,FolderKanban,ClipboardList,CheckCircle2} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useProjectStore } from "@/stores/useProjectStore";
import { useTaskStore } from "@/stores/useTaskStore";
import PageLayout from "@/components/PageLayout";

const AdminPage = () => {
  const { projects } = useProjectStore();
  const { tasks } = useTaskStore();

  const pendingTasks = tasks.filter((task) => task.status !== "completed").length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const totalProgress = tasks.reduce((acc, task) => {
    if (task.status === "completed") return acc + 100;
    if (task.status === "halfway") return acc + 50;
    return acc;
  }, 0);

  const progress = tasks.length > 0 ? Math.round(totalProgress / tasks.length) : 0;


  return (
    <PageLayout>
      <div className="p-6 space-y-8">
        {/* TOP */}
        <div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-10 text-rose-400" />
            <div>
              <h1 className="text-4xl font-bold">Admin Panel</h1>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Assignments */}
          <Card className=" bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-zinc-200 text-sm">Assignments</p>
                <h2 className="text-3xl font-bold mt-2 text-zinc-400">
                  {projects.length}
                </h2>
              </div>
              <FolderKanban className="size-10 text-rose-400" />
            </CardContent>
          </Card>

          {/* TASKS */}
          <Card className=" bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-zinc-200 text-sm">Tasks</p>
                <h2 className="text-3xl font-bold mt-2 text-zinc-400">
                  {tasks.length}
                </h2>
              </div>
              <ClipboardList className="size-10 text-yellow-400" />
            </CardContent>
          </Card>

          {/* COMPLETED */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-zinc-200 text-sm">Completed</p>
                <h2 className="text-3xl font-bold mt-2 text-zinc-400">
                  {completedTasks}
                </h2>
              </div>
              <CheckCircle2 className="size-10 text-green-400" />
            </CardContent>
          </Card>
        </div>

        {/* PROGRESS */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Overall Progress
              </h2>
              <span className="text-2xl font-bold text-rose-400">
                {progress}%
              </span>
            </div>

            {/* PROGRESS BAR */}
            <div className="w-full h-5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-rose-500 transition-all
                ${progress === 0 ? "w-0" : progress >= 100 ? "w-full" : progress >= 90 ? "w-11/12" : progress >= 75 ? "w-9/12" : progress >= 50 ? "w-6/12" : progress >= 25 ? "w-3/12" : "w-1/12"}`}
              />
            </div>

            {/* TASK INFO */}
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-800 rounded-lg p-5">
                <p className="text-zinc-200 text-sm">Completed Tasks</p>
                <h3 className="text-3xl font-bold mt-2 text-green-400">
                  {completedTasks}
                </h3>
              </div>

              <div className="bg-zinc-800 rounded-lg p-5">
                <p className="text-zinc-200 text-sm">Pending Tasks</p>
                <h3 className="text-3xl font-bold mt-2 text-yellow-400">
                  {pendingTasks}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AdminPage;
