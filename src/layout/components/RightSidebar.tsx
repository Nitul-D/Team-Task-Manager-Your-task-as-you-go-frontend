import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/stores/useUserStore";
import { useUser } from "@clerk/react";
import { Users } from "lucide-react";
import { useEffect } from "react";
import RightLoginPrompt from "./RightLoginPrompt";

const RightSidebar = () => {
  const { users, fetchUsers } = useUserStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col overflow-hidden">
      {!user && <RightLoginPrompt />}

      {/* TOP */}
      {user && (
      <>
      <div className="p-4 flex justify-between items-center border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">All Users</h2>
        </div>
      </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {users.map((user) => (
              <div key={user._id}
                className= "flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800/40 transition">
                <Avatar
                  className= "size-10 border border-zinc-800">
                  <AvatarImage src={user.imageUrl} alt={user.username} />
                  <AvatarFallback>{user.username[0]}</AvatarFallback>
                </Avatar>

                <div className= "min-w-0">
                  <p className= "text-sm font-medium text-white truncate">
                    {user.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
    </>
  )}
  </div>
);
};

export default RightSidebar;