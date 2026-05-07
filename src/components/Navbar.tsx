import { useAuthStore } from "@/stores/useAuthStore";
import { useUser, UserButton } from "@clerk/react";
import { ShieldCheck, User } from "lucide-react";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { isAdmin } = useAuthStore();

  if (!isLoaded) return null;

  return (
    //complete Navbar 2nd for logo 3rd for Admin use
    <div className="flex items-center justify-between px-4 py-2 sticky top-0 bg-zinc-900 backdrop-blur-xl border-b border-zinc-800 z-10 rounded-md">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/ttmanager.png"
            alt="Team Task Manager Logo"
            className="w-11.2 h-12 hidden sm:block"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {isSignedIn && (
          <>
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                  <ShieldCheck className="size-4" />
                  <span className="text-sm font-semibold">Admin</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-white">
                  <User className="size-4" />
                  <span className="text-sm font-semibold">User</span>
                </div>
              )}
            </div>

            <UserButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
