import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
