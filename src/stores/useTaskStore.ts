import { axiosConnection } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface Task {
  _id: string;
  title: string;
  status: string;
  assignedTo: {_id: string; username: string; imageUrl: string}
  assignedBy: string;
  dDate: string;
  projectId: {_id: string; name: string};
}

interface TaskStore {
  tasks: Task[];
  isTasksLoading: boolean;
  isCreateTaskLoading: boolean;
  isDeleteTaskLoading: boolean;
  tasksError: string | null;

  fetchTasks: () => Promise<void>;
  createTask: (data: any) => Promise<void>;
  updateTask: (id: string,data: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    isTasksLoading: false,
    isCreateTaskLoading: false,
    isDeleteTaskLoading: false,
    tasksError: null,

    // FETCH TASKS
    fetchTasks: async () => {
      set({ isTasksLoading: true, tasksError: null });

      try {
        const response = await axiosConnection.get("/tasks");

        set({ tasks: response.data.tasks });
      } catch (error: any) {
        set({ tasksError: error.response?.data?.message });
      } finally {
        set({ isTasksLoading: false });
      }
    },

    // CREATE TASK
    createTask: async (data) => {
      set({ isCreateTaskLoading: true });

      try {
        const response = await toast.promise(
          axiosConnection.post("/tasks", data),
          {
            loading: "Assigning Task...",
            success: "Task Assigned Successfully",
          },
        );

        set((state) => ({ tasks: [response.data.task, ...state.tasks] }));
      } catch (error: any) {
        console.log(error.response);

        toast.error(error.response?.data?.message || "Task creation failed");
      } finally {
        set({ isCreateTaskLoading: false });
      }
    },

    // UPDATE TASK
    updateTask: async (id,data) => {
      try {
        const response = await toast.promise(axiosConnection.put(`/tasks/${id}`, data),
            {
              loading: "Updating Task...",
              success: "Task Updated Successfully",
            }
          );

        set((state) => ({tasks: state.tasks.map((task) => task._id === id ? response.data.updated : task)}));
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    },

    // DELETE TASK
    deleteTask: async (id) => {
      set({ isDeleteTaskLoading: true });

      try {
        await toast.promise(axiosConnection.delete(`/tasks/${id}`),
          {
            loading: "Deleting Task...",
            success: "Task Deleted Successfully",
          }
        );

        set((state) => ({ tasks: state.tasks.filter((task) => task._id !== id )}));
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        set({ isDeleteTaskLoading: false });
      }
    },
  }));