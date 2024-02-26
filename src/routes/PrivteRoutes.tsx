import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Settings from "../pages/Settings";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/setting" element={<Settings />} />
    </Routes>
  );
};

export default PrivateRoutes;
