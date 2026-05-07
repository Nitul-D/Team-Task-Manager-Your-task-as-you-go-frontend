import { axiosConnection } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Project {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

interface ProjectStore {
  projects: Project[];
  currentProject: Project | null;
  isProjectsLoading: boolean;
  isCreateProjectLoading: boolean;
  isDeleteProjectLoading: boolean;
  projectsError: string | null;

  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  createProject: (data: any) => Promise<void>
  updateProject: (id: string,data: any) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    currentProject: null,
    isProjectsLoading: false,
    isCreateProjectLoading: false,
    isDeleteProjectLoading: false,
    projectsError: null,

    // FETCH ALL PROJECTS
    fetchProjects: async () => {
      set({ isProjectsLoading: true, projectsError: null });

      try {
        const response = await axiosConnection.get("/projects");
        set({ projects: response.data.projects });
      } catch (error: any) {
        set({ projectsError: error.response?.data?.message });
      } finally {
        set({ isProjectsLoading: false });
      }
    },

    // FETCH PROJECT BY ID
    fetchProjectById: async (id) => {
      set({ isProjectsLoading: true, projectsError: null });

      try {
        const response = await axiosConnection.get(`/projects/${id}`);
        set({ currentProject: response.data.project });
      } catch (error: any) {
        set({ projectsError: error.response?.data?.message });
      } finally {
        set({ isProjectsLoading: false });
      }
    },

    // CREATE PROJECT
    createProject: async (data) => {
      set({ isCreateProjectLoading: true });

      try {
        const response =
          await toast.promise(axiosConnection.post("/projects",data),
            {
              loading: "Creating Project...",
              success: "Project Created Successfully",
            }
          );

        set((state) => ({
          projects: [response.data.project, ...state.projects],
        }));
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        set({ isCreateProjectLoading: false });
      }
    },

    // UPDATE PROJECT
    updateProject: async (id,data) => {
      try {
        const response = await toast.promise(axiosConnection.put(`/projects/${id}`,data),
            {
              loading: "Updating Project...",
              success: "Project Updated Successfully",
            }
          );

        set((state) => ({ projects: state.projects.map((project) => project._id === id ? response.data.updated : project),
        }));
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    },

    // DELETE PROJECT
    deleteProject: async (id) => {
      set({ isDeleteProjectLoading: true });

      try {
        await toast.promise(axiosConnection.delete(`/projects/${id}`),
          {
            loading: "Deleting Project...",
            success: "Project Deleted Successfully",
          }
        );

        set((state) => ({ projects: state.projects.filter((project) => project._id !== id)}));
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        set({ isDeleteProjectLoading: false });
      }
    },
  }));