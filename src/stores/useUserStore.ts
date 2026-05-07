import { axiosConnection } from "@/lib/axios";
import { create } from "zustand";

interface User {
  _id: string;
  clerkId: string;
  username: string;
  imageUrl: string;
}

interface UserStore {
  users: User[];
  isUsersLoading: boolean;
  usersError: string | null;

  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    isUsersLoading: false,
    usersError: null,

    fetchUsers: async () => {
      set({ isUsersLoading: true, usersError: null });

      try {
        const response = await axiosConnection.get("/users");

        set({ users: response.data });
      } catch (error: any) {
        set({ usersError: error.response?.data?.message });
      } finally {
        set({ isUsersLoading: false });
      }
    },
  }));