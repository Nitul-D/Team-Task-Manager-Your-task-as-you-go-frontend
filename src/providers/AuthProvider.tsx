import { axiosConnection } from "@/lib/axios";
import { useAuth } from "@clerk/react";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

//for token everytime the page is refresh and check for authorization from the server backend
const updateApiToken = (token: string | null) => {
  if (token) {
    axiosConnection.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosConnection.defaults.headers.common["Authorization"];
  }
};

//for loading state, spinner and token checking
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
        }
      } catch (error: any) {
        updateApiToken(null);
        console.log("Error in Provider", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [getToken]);

  //hide screen and center the spinner
  //spinner properties
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  return (
  <>
  {children}
  </>
  )
};

export default AuthProvider;
