import ApiDataTable from "../components/ApiDataTable";
import ApiModal from "../components/ApiModal";

const Settings = () => {
  return (
    <div className="h-screen flex items-center p-5">
      <ApiDataTable />
      <ApiModal />
    </div>
  );
};

export default Settings;
