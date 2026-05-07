import { Route, Routes } from "react-router-dom";
import AuthCallback from "./pages/auth-callback/AuthCallback";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import ProjectsPage from "./pages/projects/ProjectsPage";
import TasksPage from "./pages/task/TasksPage";
import ProgressPage from "./pages/progress/ProgressPage";
import AdminPage from "./pages/admin/AdminPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth-callback" element={<AuthCallback />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>

      </Routes>

      <Toaster />
    </>
  );
}

export default App
