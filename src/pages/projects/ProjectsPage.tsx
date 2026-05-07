import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderKanban, Pencil, Trash2 } from "lucide-react";
import { useProjectStore } from "@/stores/useProjectStore";
import CreateProject from "@/components/CreateProject";
import PageLayout from "@/components/PageLayout";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ProjectsPage = () => {
  const { projects, deleteProject, updateProject } = useProjectStore();
  const { isAdmin } = useAuthStore();

  const [editingProject, setEditingProject] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setEditName(project.name);
    setEditDescription(project.description);
  };

  const handleUpdate = async () => {
    await updateProject(editingProject._id, {
      name: editName,
      description: editDescription,
    });

    setEditingProject(null);
  };

  return (
    <PageLayout>
      <div className="p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Assignments</h1>
            <p className="text-zinc-400 mt-2">
              {isAdmin ? "Manage all Users Assignments" : "Your Assignments"}
            </p>
          </div>

          <CreateProject />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <FolderKanban className="size-10 text-rose-400" />
                  <div className="flex items-center gap-2">
                    {/* Update */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil className="size-5 text-sky-400" />
                    </Button>

                    {/* DELETE */}
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteProject(project._id)}
                    >
                      <Trash2 className="size-5 text-red-400" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {project.name}
                  </h2>
                  <p className="text-zinc-200 mt-3 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Project Name"
            />

            <Input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description"
            />

            <Button
              className="w-full bg-rose-500 hover:bg-rose-600"
              onClick={handleUpdate}
            >
              Update Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default ProjectsPage;
