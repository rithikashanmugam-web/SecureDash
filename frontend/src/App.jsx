import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SuperAdminDashboard from "./pages/SuperAdminDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ModulePage from "./pages/ModulePage.jsx";

const normalizeRole = (role) => {
  if (!role) return "";
  return String(role).toLowerCase().replace(/[_\s]/g, "");
};

function App() {
  // read directly from localStorage (avoid async/state races)
  const token = localStorage.getItem("token");
  const role = normalizeRole(localStorage.getItem("role"));

  console.log("App startup -> token present:", !!token, "role:", role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Super Admin */}
        <Route
          path="/superadmin/*"
          element={token && role === "superadmin" ? <SuperAdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/superadmin/module/:moduleName" element={<ModulePage />} />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={token && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/admin/module/:moduleName" element={<ModulePage />} />

        {/* User */}
        <Route
          path="/user/*"
          element={token && role === "user" ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/user/module/:moduleName" element={<ModulePage />} />

        {/* default */}
        <Route
          path="/"
          element={
            token ? (
              role === "superadmin" ? <Navigate to="/superadmin" /> :
              role === "admin" ? <Navigate to="/admin" /> :
              role === "user" ? <Navigate to="/user" /> :
              <Navigate to="/login" />
            ) : <Navigate to="/login" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
