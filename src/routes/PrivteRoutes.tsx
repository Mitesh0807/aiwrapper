import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layout/DashboardLayout";
import Settings from "../pages/Settings";
import ChatHistory from "../components/ChatHistory";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path=":id" element={<ChatHistory />} />
      </Route>
      <Route path="/setting" element={<Settings />} />
    </Routes>
  );
};

export default PrivateRoutes;
